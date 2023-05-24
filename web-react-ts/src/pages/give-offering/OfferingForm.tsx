import { useMutation } from '@apollo/client'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
import {
  GH_MOBILE_NETWORK_OPTIONS,
  Input,
  MOMO_NUM_REGEX,
  Select,
} from '@jaedag/admin-portal-react-core'
import { useUser } from 'contexts/UserContext'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { GIVE_FELLOWSHIP_OFFERING_MOMO } from './giveOfferingQueries'

const GIVING_METHODS = [
  { key: 'Mobile Money', value: 'mobileMoney' },
  { key: 'Card', value: 'card' },
]

const OfferingForm = () => {
  const { user, setTransactionId } = useUser()
  const [error, setError] = useState('')
  const initialValues = {
    amount: '',
    bankingCode: user.fellowship.bankingCode,
    date: new Date(),
    method: 'mobileMoney',
    mobileNetwork: '',
    mobileMoneyNumber: '',
  }
  const [giveMomo] = useMutation(GIVE_FELLOWSHIP_OFFERING_MOMO)
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    amount: Yup.number().required(),
    bankingCode: Yup.number().required(),
    method: Yup.string().required(),
    mobileNetwork: Yup.string().required(),
    mobileMoneyNumber: Yup.string()
      .required('You must enter a mobile number')
      .matches(
        MOMO_NUM_REGEX,
        `Enter a valid MoMo Number without spaces. eg. (02XXXXXXXX)`
      ),
  })

  const onSubmit = async (
    values: typeof initialValues,
    onSubmitProps: FormikHelpers<typeof initialValues>
  ) => {
    const { setSubmitting } = onSubmitProps
    try {
      setSubmitting(true)
      const res = await giveMomo({
        variables: {
          amount: parseFloat(values.amount),
          mobileNumber: values.mobileMoneyNumber,
          mobileNetwork: values.mobileNetwork,
          bankingCode: parseInt(values.bankingCode.toString(), 10),
        },
      })

      setTransactionId(res.data?.giveFellowshipOfferingMomo.id)
      navigate('/confirm-transaction')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Input
                  name="amount"
                  label="Amount"
                  placeholder="Enter The Amount in GHS"
                />
                <Input
                  name="bankingCode"
                  label="Fellowship Code"
                  placeholder=""
                />
                <Select
                  label="Method of Giving"
                  name="method"
                  options={GIVING_METHODS}
                />

                {formik.values.method === 'mobileMoney' && (
                  <>
                    <Select
                      name="mobileNetwork"
                      label="Mobile Network"
                      placeholder="Enter Your Mobile Network"
                      options={GH_MOBILE_NETWORK_OPTIONS}
                    />
                    <Input
                      name="mobileMoneyNumber"
                      label="Mobile Money Number"
                      placeholder="Enter Your Mobile Money Number"
                    />
                  </>
                )}
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Center>
                  <Button
                    marginTop={10}
                    type="submit"
                    size="lg"
                    width="100%"
                    isLoading={formik.isSubmitting}
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
