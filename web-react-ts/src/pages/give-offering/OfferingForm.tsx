/* eslint-disable react/jsx-props-no-spreading */
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
  Modal,
  Input as ChakraInput,
  Spacer,
  Text,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react'
import {
  GH_MOBILE_NETWORK_OPTIONS,
  Input,
  MOMO_NUM_REGEX,
  Select,
} from '@jaedag/admin-portal-react-core'
import { useUser } from 'contexts/UserContext'
import { useState } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import BacentaCodeInputMessage from 'components/BacentaCodeInputMessage'
import {
  CONFIRM_BACENTA_OFFERING_MOMO,
  GIVE_BACENTA_OFFERING_MOMO,
  SEND_TRANSACTION_OTP,
} from './giveOfferingQueries'

const GIVING_METHODS = [
  { key: 'Mobile Money', value: 'mobileMoney' },
  { key: 'Card', value: 'card' },
]

const OfferingForm = () => {
  const { user, setTransactionId } = useUser()
  const toast = useToast()
  const [error, setError] = useState('')
  const [otp, setOtp] = useState('')
  const [reference, setReference] = useState('')
  const { isOpen, onClose, onOpen } = useDisclosure()
  const initialValues = {
    amount: 0,
    bankingCode: user.bacenta?.bankingCode,
    date: new Date(),
    method: 'mobileMoney',
    mobileNetwork: '',
    mobileMoneyNumber: '',
  }

  const [GiveMomo] = useMutation(GIVE_BACENTA_OFFERING_MOMO)
  const [ConfirmTransactionMutation, { loading: confirming }] = useMutation(
    CONFIRM_BACENTA_OFFERING_MOMO
  )
  const [SendTransactionOTP, { loading: submittingOTP }] =
    useMutation(SEND_TRANSACTION_OTP)
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    amount: Yup.number()
      .positive('You must enter a valid amount')
      .required('Amount is a required field'),
    bankingCode: Yup.number().required(),
    date: Yup.date().required(),
    method: Yup.string().required(),
    mobileNetwork: Yup.string().required('Mobile Network is a required field'),
    mobileMoneyNumber: Yup.string()
      .required('You must enter a mobile number')
      .matches(
        MOMO_NUM_REGEX,
        `Enter a valid MoMo Number without spaces. eg. (02XXXXXXXX)`
      ),
  })
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<typeof initialValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const res = await GiveMomo({
        variables: {
          memberEmail: user.email,
          amount: values.amount,
          mobileNumber: values.mobileMoneyNumber,
          mobileNetwork: values.mobileNetwork,
          bankingCode: parseInt(values.bankingCode.toString(), 10),
        },
      })

      setTransactionId(res.data?.GiveBacentaOfferingMomo.id)

      if (res.data?.GiveBacentaOfferingMomo.transactionStatus === 'send_otp') {
        setReference(res.data?.GiveBacentaOfferingMomo.transactionReference)
        onOpen()
      } else {
        navigate('/confirm-transaction')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Container marginY={5}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Alert status="info">
              <AlertIcon />
              <AlertTitle>Info!</AlertTitle>
            </Alert>

            <Text marginY={5}>
              A registration token has just been sent to your phone via text
              message. Please enter it here 👇
            </Text>

            <ChakraInput onChange={(e) => setOtp(e.target.value)} />
            <Button
              marginY={5}
              colorScheme="green"
              isLoading={submittingOTP}
              onClick={async () => {
                try {
                  await SendTransactionOTP({
                    variables: {
                      reference,
                      otp,
                    },
                  })
                } catch (err) {
                  toast({
                    title: 'Error',
                    description: (err as Error).message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                }
              }}
            >
              Submit OTP
            </Button>
            <Text
              onClick={async () => {
                try {
                  await ConfirmTransactionMutation({
                    variables: {
                      reference,
                    },
                  })

                  navigate('/giving-history')
                } catch (err) {
                  toast({
                    title: 'Error',
                    description: (err as Error).message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                }
              }}
              className="text-secondary mt-2"
            >
              {`Didn't`} receive a token? Click <u>here</u> to resend{' '}
              <Button variant="ghost" padding={0} isLoading={confirming} />
            </Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="amount"
              label="Amount"
              control={control}
              errors={errors}
              placeholder="Enter The Amount in GHS"
            />

            <Input
              name="bankingCode"
              label="Banking Code"
              control={control}
              errors={errors}
            />
            <BacentaCodeInputMessage
              watchedBacentaCode={watch('bankingCode')}
            />

            <Select
              label="Method of Giving"
              name="method"
              options={GIVING_METHODS}
              control={control}
              errors={errors}
            />

            {watch('method') === 'mobileMoney' && (
              <>
                <Select
                  name="mobileNetwork"
                  label="Mobile Network"
                  placeholder="Enter Your Mobile Network"
                  options={GH_MOBILE_NETWORK_OPTIONS}
                  control={control}
                  errors={errors}
                />
                <Input
                  name="mobileMoneyNumber"
                  label="Mobile Money Number"
                  placeholder="Enter Your Mobile Money Number"
                  control={control}
                  errors={errors}
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
                isLoading={isSubmitting}
                colorScheme="whatsapp"
              >
                Give
              </Button>
            </Center>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}

export default OfferingForm
