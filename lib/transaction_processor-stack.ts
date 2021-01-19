import * as path from "path";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sfn from "@aws-cdk/aws-stepfunctions";
import * as sfnTasks from "@aws-cdk/aws-stepfunctions-tasks";
import * as ecr from "aws-cdk/aws-ecr";
import { EcrImageCode } from "@aws-cdk/aws-lambda";

export class TransactionProcessorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ecr 
    // const processPurchase = new ecr.
    
    // lambda 
    const processPurchase = new lambda.Function(this, "process purchase handler", {
      runtime: lambda.Runtime.PYTHON_3_6,
      handler: "code.process_purchase",
      code: lambda.Code.fromAsset(path.join(__dirname, "../code")),
    });

    const processRefund = new lambda.Function(this, "process refund handler", {
      runtime: lambda.Runtime.PYTHON_3_6,
      handler: "code.process_refund",
      code: lambda.Code.fromAsset(path.join(__dirname, "../code")),
    });

    const generatePurchaseReceipt = new lambda.Function(this, "generate purchase receipt handler", {
      runtime: lambda.Runtime.PYTHON_3_6,
      handler: "code.generate_purchase_receipt",
      code: lambda.Code.fromAsset(path.join(__dirname, "../code")),
    });

    const generateRefundReceipt = new lambda.Function(this, "generate refund receipt handler", {
      runtime: lambda.Runtime.PYTHON_3_6,
      handler: "code.generate_refund_receipt",
      code: lambda.Code.fromAsset(path.join(__dirname, "../code")),
    });


    // step function tasks 
    const processPurchaseTask = new sfnTasks.LambdaInvoke(this, "process purchase task", {
      lambdaFunction: processPurchase
    });

    const processRefundTask = new sfnTasks.LambdaInvoke(this, "process refund task", {
      lambdaFunction: processRefund,
    });

    const generatePurchaseReceiptTask = new sfnTasks.LambdaInvoke(this, "generate purchase receipt task", {
      lambdaFunction: generatePurchaseReceipt,
    });

    const generateRefundReceiptTask = new sfnTasks.LambdaInvoke(this, "generate refund receipt task", {
      lambdaFunction: generateRefundReceipt,
    });

    
    // step function conditions 
    const transactionChoice = new sfn.Choice(this, "process transaction");
    const transactionTypeEqualsPurchase = sfn.Condition.stringEquals("$.TransactionType", "PURCHASE");
    const transactionTypeEqualsRefund = sfn.Condition.stringEquals("$.TransactionType", "REFUND");

    const StateMachineDefinition = transactionChoice.when(transactionTypeEqualsPurchase, processPurchaseTask.next(generatePurchaseReceiptTask)).when(transactionTypeEqualsRefund, processRefundTask.next(generateRefundReceiptTask));

    const Workflow = new sfn.StateMachine(this, "transaction workflow", {
      definition: StateMachineDefinition
    });





    

  }
}
