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
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'

const GIVING_METHODS = [
  { key: 'Mobile Money', value: 'Mobile Money' },
  { key: 'Card', value: 'Card' },
]

const OfferingForm = () => {
  const initialValues = {
    amount: '',
    date: new Date(),
    method: '',
  }

  const onSubmit = (
    values: typeof initialValues,
    onSubmitProps: FormikHelpers<typeof initialValues>
  ) => {
    const { setSubmitting } = onSubmitProps

    setSubmitting(false)
    console.log(values)
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
            <Text>Hi David</Text>
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
