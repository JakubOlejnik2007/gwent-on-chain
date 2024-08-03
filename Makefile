create-canisters:
	dfx canister create --all

deploy-provider:
	dfx deploy ic_siwe_provider --argument "( \
	    record { \
	        domain = \"127.0.0.1\"; \
	        uri = \"http://127.0.0.1:5173\"; \
	        salt = \"somerandomsalt\"; \
	        chain_id = opt 1; \
	        scheme = opt \"http\"; \
	        statement = opt \"Login to gwent-on-chain\"; \
	        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
	        session_expires_in = opt 604800000000000; /* 1 week */ \
	        targets = opt vec { \
	            \"$$(dfx canister id ic_siwe_provider)\"; \
	            \"$$(dfx canister id backend)\"; \
	        }; \
	    } \
	)"

deploy-backend:
	dfx deploy backend --argument "(principal \"$$(dfx canister id ic_siwe_provider)\")"

deploy-frontend:
	npm install
	dfx deploy frontend

deploy-all: create-canisters deploy-provider deploy-backend deploy-frontend

deploy-all-ic:
	dfx canister --network ic create --all

	dfx deploy ic_siwe_provider --network ic --argument "( \
	    record { \
	        domain = \"https://ae5hp-hiaaa-aaaan-qmsbq-cai.icp0.io/\"; \
	        uri = \"https://$$(dfx canister --network ic id frontend).icp0.io\"; \
	        salt = \"somerandomsalt\"; \
	        chain_id = opt 1; \
	        scheme = opt \"https\"; \
	        statement = opt \"Login to gwent-on-chain\"; \
	        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
	        session_expires_in = opt 604800000000000; /* 1 week */ \
	        targets = opt vec { \
	            \"$$(dfx canister --network ic id ic_siwe_provider)\"; \
	            \"$$(dfx canister --network ic id backend)\"; \
	        }; \
	    } \
	)"

	dfx deploy backend --network ic --argument "(principal \"$$(dfx canister --network ic id ic_siwe_provider)\")"
	npm install

	dfx deploy frontend --network ic

run-frontend:
	npm install
	npm run dev

clean:
	rm -rf .azle
	rm -rf .dfx
	rm -rf dist
	rm -rf node_modules
	rm -f .env
