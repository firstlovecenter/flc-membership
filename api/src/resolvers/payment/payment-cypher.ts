export const getMember = `
    OPTIONAL MATCH (member:Member {auth_id: $auth.jwt.sub})
    MATCH (fellowship:Fellowship {bankingCode: $bankingCode})<-[:HAS*4]-(stream:Stream)
    RETURN member, stream
`

export const getStreamFromFellowshipCode = `
    MATCH (fellowship:Fellowship {bankingCode: $bankingCode})<-[:HAS*4]-(stream:Stream)
    RETURN  stream
`

export const initiateOfferingTransaction = `
    MATCH (member:Member {auth_id: $auth.jwt.sub})-[:BELONGS_TO]->(fellowship:Fellowship)
    WITH member, fellowship

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

    WITH member, fellowship, transaction
    MERGE (member)-[:MADE]->(transaction)
    MERGE (transaction)-[:GIVEN_AT]->(fellowship)

    RETURN transaction
`

export const initiateTitheTransaction = `
    MATCH (member:Member {auth_id: $auth.jwt.sub})-[:BELONGS_TO]->(fellowship:Fellowship)
    WITH member, fellowship

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

    WITH member, fellowship, transaction
    MERGE (member)-[:MADE]->(transaction)
    MERGE (transaction)-[:GIVEN_AT]->(fellowship)

    RETURN transaction
`

export const checkTransactionReference = `
MATCH (transaction {transactionReference: $reference})-[:GIVEN_AT]->(node) WHERE node:ServiceRecord OR node:Fellowship
MATCH (node)<-[:HAS_SERVICE|HAS_HISTORY|HAS*4..6]-(stream:Stream)
RETURN transaction, stream
`

export const setTransactionStatusFailed = `
MATCH (transaction:Transaction {transactionReference: $reference})
SET transaction.transactionStatus = $status,
    transaction.failureReason = $failureReason

RETURN transaction
`

export const setTransactionStatus = `
MATCH (transaction:Transaction {transactionReference: $reference})
    SET transaction.transactionStatus = $transactionStatus

    RETURN transaction 
`
