import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { Input, Select } from '@jaedag/admin-portal-core'
import { useAuth } from 'contexts/AuthContext'
import { useUser } from 'contexts/UserContext'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const GIVING_METHODS = [
  { key: 'Mobile Money', value: 'Mobile Money' },
  { key: 'Card', value: 'Card' },
]

const OfferingForm = () => {
  const { user } = useUser()
  const initialValues = {
    amount: '',
    fellowshipCode: user.fellowship.bankingCode,
    date: new Date(),
    method: '',
  }

  const validationSchema = Yup.object({
    amount: Yup.number().required(),
    fellowshipCode: Yup.string().required(),
    method: Yup.string().required(),
  })

  const onSubmit = (
    values: typeof initialValues,
    onSubmitProps: FormikHelpers<typeof initialValues>
  ) => {
    const { setSubmitting } = onSubmitProps

    setSubmitting(false)
    setSubmitting(true)
  }

  return (
    <Container marginY={5}>
      <Card variant="outline">
        <CardHeader>
          <Heading>Give An Offering!</Heading>
        </CardHeader>
        <CardBody>
          <Box paddingBottom={10}>
            <Text>Hi {user.firstName}</Text>
            <Text>
              God bless your seed and cause men to give to you according to Luke
              6:38
            </Text>
            <Flex>
              <Spacer />
              <Box color="whiteAlpha.600">
                <Text size="sm">- Lead Pastor</Text>
                <Text size="sm">Joshua Heward-Mills</Text>
              </Box>
            </Flex>
          </Box>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => (
              <Form>
                <Input
                  name="amount"
                  label="Amount"
                  placeholder="Enter The Amount in GHS"
                />
                <Input
                  name="fellowshipCode"
                  label="Fellowship Code"
                  placeholder=""
                />
                <Select
                  label="Method of Giving"
                  name="method"
                  options={GIVING_METHODS}
                />
                <Center>
                  <Button
                    marginTop={10}
                    type="submit"
                    size="lg"
                    width="100%"
                    colorScheme="whatsapp"
                  >
                    Give
                  </Button>
                </Center>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Container>
  )
}

export default OfferingForm
