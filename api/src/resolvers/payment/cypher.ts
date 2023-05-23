export const getMember = `
    MATCH (member:Member {auth_id: $auth.jwt.sub})
    MATCH (fellowship:Fellowship {bankingCode: $bankingCode})<-[:HAS*4]-(stream:Stream)
    RETURN member, stream
`

export const initiatePaymentTransaction = `
    MATCH (member:Member {auth_id: $auth.jwt.sub})-[:BELONGS_TO]->(fellowship:Fellowship)
    WITH member, fellowship

    CREATE (transaction:Offering:Transaction {id: randomUUID()})
        SET transaction.amount = $amount,
            transaction.reference = $reference,
            transaction.status = $status,
            transaction.createdAt = datetime(),
            transaction.mobileNetwork = $mobileNetwork,
            transaction.mobileNumber = $mobileNumber

    WITH member, fellowship, transaction
    MERGE (member)-[:MADE]->(transaction)
    MERGE (transaction)-[:FOR]->(fellowship)

    RETURN transaction
`
