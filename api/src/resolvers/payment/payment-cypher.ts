export const getMember = `
    OPTIONAL MATCH (member:Member {email: $memberEmail})
    MATCH (bacenta:Bacenta {bankingCode: $bankingCode})<-[:HAS*3]-(stream:Stream)
    RETURN member, stream
`

export const getStreamFromBacentaCode = `
    MATCH (bacenta:Bacenta {bankingCode: $bankingCode})<-[:HAS*3]-(stream:Stream)
    RETURN  stream
`

export const initiateOfferingTransaction = `
    MATCH (member:Member {email: $memberEmail})-[:BELONGS_TO]->(bacenta:Bacenta)
    WITH member, bacenta

    CREATE (transaction:Offering:Transaction {id: randomUUID()})
        SET transaction.amount = $amount,
            transaction.category = 'offering',
            transaction.bankingCode = $bankingCode,
            transaction.transactionReference = $transactionReference,
            transaction.transactionStatus = $transactionStatus,
            transaction.createdAt = datetime(),
            transaction.method = 'mobileMoney',
            transaction.mobileNetwork = $mobileNetwork,
            transaction.mobileNumber = $mobileNumber

    WITH member, bacenta, transaction
    MERGE (member)-[:MADE]->(transaction)
    MERGE (transaction)-[:GIVEN_AT]->(bacenta)

    RETURN transaction
`

export const initiateTitheTransaction = `
    MATCH (member:Member {email: $memberEmail})-[:BELONGS_TO]->(bacenta:Bacenta)
    WITH member, bacenta

    CREATE (transaction:Tithe:Transaction {id: randomUUID()})
        SET transaction.amount = $amount,
            transaction.category = 'tithe',
            transaction.bankingCode = $bankingCode,
            transaction.transactionReference = $transactionReference,
            transaction.transactionStatus = $transactionStatus,
            transaction.createdAt = datetime(),
            transaction.method = 'mobileMoney',
            transaction.mobileNetwork = $mobileNetwork,
            transaction.mobileNumber = $mobileNumber

    WITH member, bacenta, transaction
    MERGE (member)-[:MADE]->(transaction)
    MERGE (transaction)-[:GIVEN_AT]->(bacenta)

    RETURN transaction
`

export const checkTransactionReference = `
MATCH (transaction {transactionReference: $reference})-[:GIVEN_AT]->(node) WHERE node:ServiceRecord OR node:Bacenta
MATCH (node)<-[:HAS_SERVICE|HAS_HISTORY|HAS*4..6]-(stream:Stream)
RETURN transaction, stream
`

export const setTransactionStatusFailed = `
MATCH (transaction:Transaction {transactionReference: $reference})
SET transaction.transactionStatus = $transactionStatus,
    transaction.failureReason = $failureReason

RETURN transaction
`

export const setTransactionStatus = `
MATCH (transaction:Transaction {transactionReference: $reference})
    SET transaction.transactionStatus = $transactionStatus

    RETURN transaction 
`
