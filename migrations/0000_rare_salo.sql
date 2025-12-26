CREATE TYPE "public"."network" AS ENUM('ethereum-mainnet', 'base-mainnet', 'binance-mainnet');--> statement-breakpoint
CREATE TABLE "transfers" (
	"tokenSymbol" varchar NOT NULL,
	"tokenAddress" varchar NOT NULL,
	"network" "network" NOT NULL,
	"blockNumber" integer NOT NULL,
	"logIndex" integer NOT NULL,
	"transactionIndex" integer NOT NULL,
	"from" varchar NOT NULL,
	"to" varchar NOT NULL,
	"rawAmount" numeric NOT NULL,
	"amount" varchar NOT NULL,
	"createdAt" timestamp,
	CONSTRAINT "transfers_blockNumber_transactionIndex_logIndex_network_tokenAddress_pk" PRIMARY KEY("blockNumber","transactionIndex","logIndex","network","tokenAddress")
);
