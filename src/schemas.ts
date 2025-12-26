import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

/**
 * Full list of available network ids
 * https://beta.docs.sqd.dev/en/data/networks
 */
export const networks = [
  "ethereum-mainnet",
  "base-mainnet",
  "binance-mainnet",
] as const;

export const networkEnum = pgEnum("network", networks);

export const transfersTable = pgTable(
  "transfers",
  {
    tokenSymbol: varchar().notNull(),
    tokenAddress: varchar().notNull(),
    network: networkEnum().notNull(),
    blockNumber: integer().notNull(),
    logIndex: integer().notNull(),
    transactionIndex: integer().notNull(),
    from: varchar().notNull(),
    to: varchar().notNull(),
    rawAmount: numeric({ mode: "bigint" }).notNull(),
    amount: varchar().notNull(),
    createdAt: timestamp(),
  },
  (table) => [
    primaryKey({
      columns: [
        table.blockNumber,
        table.transactionIndex,
        table.logIndex,
        table.network,
        table.tokenAddress,
      ],
    }),
  ]
);

export type Transfer = typeof transfersTable.$inferInsert

export type Network = (typeof networks)[number]

export default {
  transfersTable,
}
