FROM public.ecr.aws/lambda/python:3.6.2020.12.18.22

# Copy code to container root 
COPY ./ . 

# # Install python dependencies for function
# RUN pip install

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "code.process_refund" ]  