CDK_DIR=cdk
BACKEND_DIR=backend

clean-backend:
	rm -rf $(BACKEND_DIR)/dist

build-backend: clean-backend
	cd $(BACKEND_DIR) && npm i && npm run build && npm prune --production

## AWS Deployment Commands

deploy: build-backend
	cd $(CDK_DIR) && \
		npm run cdk synth && \
		npm run cdk -- deploy -v --require-approval never --progress events "*"
