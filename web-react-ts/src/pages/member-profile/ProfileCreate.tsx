import { useUser } from 'contexts/UserContext'
import {
  GENDER_OPTIONS,
  ImageUpload,
  Input,
  MARITAL_STATUS_OPTIONS,
  PHONE_NUM_REGEX,
  Select,
} from '@jaedag/admin-portal-react-core'
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Resolver, useForm } from 'react-hook-form'
import { User } from '@auth0/auth0-react'
import { useMutation } from '@apollo/client'
import { parsePhoneNumber } from '@jaedag/admin-portal-types'
import { CreateMemberFormOptions } from './member-profile-types'
import { CREATE_MEMBER_PROFILE } from './memberProfileGQL'
import FellowshipCodeInputMessage from '../../components/FellowshipCodeInputMessage'

const CreateProfile = () => {
  const { user } = useUser()
  const member: User = user

  const initialValues: CreateMemberFormOptions = {
    firstName: member?.given_name ?? '',
    middleName: '',
    lastName: member?.family_name ?? '',
    gender: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: member?.email ?? '',
    dob: new Date(),
    maritalStatus: '',
    occupation: '',
    pictureUrl: member?.picture ?? '',
    visitationArea: '',
    fellowshipCode: 0,
  }

  const validationSchema = Yup.object({
    pictureUrl: Yup.string().required('You must upload a picture'),
    firstName: Yup.string().required('First Name is a required field'),
    lastName: Yup.string().required('Last Name is a required field'),
    gender: Yup.string().required('Gender is a required field'),
    maritalStatus: Yup.string().required('Marital Status is a required field'),
    dob: Yup.date()
      .max(new Date(), "You can't be born after today")
      .required('Date of Birth is a required field'),
    phoneNumber: Yup.string()
      .matches(
        PHONE_NUM_REGEX,
        `Phone Number must start with + and country code (eg. '+233')`
      )
      .required('Phone Number is required'),
    whatsappNumber: Yup.string()
      .matches(
        PHONE_NUM_REGEX,
        `Phone Number must start with + and country code (eg. '+233')`
      )
      .required('Whats App Number is required'),
    fellowshipCode: Yup.number().required(
      'Pleaser enter a valid fellowship code'
    ),
  })

  const [CreateMemberProfile] = useMutation(CREATE_MEMBER_PROFILE)

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const res = await CreateMemberProfile({
        variables: {
          ...values,
          phoneNumber: parsePhoneNumber(values.phoneNumber),
          whatsappNumber: parsePhoneNumber(values.whatsappNumber),
          dob: new Date(values.dob).toISOString().slice(0, 10),
        },
      })

      console.log('🚀 ~ file: CreateProfile.tsx:78 ~ res:', res)
    } catch (err) {
      console.log('🚀 ~ file: CreateProfile.tsx:81 ~ error:', err)
    }
  }

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<typeof initialValues>({
    resolver: yupResolver(
      validationSchema
    ) as unknown as Resolver<CreateMemberFormOptions>,
    defaultValues: initialValues,
  })

  return (
    <Container paddingBottom={20} paddingTop={10}>
      <Heading marginBottom={5}>Update Profile</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <!-- Basic Info Div --> */}
        <ImageUpload
          user={user}
          name="pictureUrl"
          initialValue={initialValues.pictureUrl}
          cloudinaryAccount="church-insights"
          control={control}
          errors={errors}
          setValue={setValue}
          uploadPreset={import.meta.env.VITE_CLOUDINARY_MEMBERS}
          placeholder="Upload New Picture"
          aria-describedby="ImageUpload"
        />
        <Text marginTop={2} size="xs" textAlign="center" color="red.300">
          Please note that * are required to submit the form
        </Text>
        <Heading marginY={2}>Basic Info</Heading>
        <Input
          label="First Name*"
          name="firstName"
          placeholder="First Name"
          aria-describedby="firstNameHelp"
          control={control}
          errors={errors}
        />
        <Input
          label="Middle Name"
          name="middleName"
          placeholder="Other Names"
          aria-describedby="middleNameHelp"
          control={control}
          errors={errors}
        />
        <Input
          label="Last Name*"
          name="lastName"
          placeholder="Last Name"
          aria-describedby="lastNameHelp"
          control={control}
          errors={errors}
        />
        <Select
          label="Gender*"
          name="gender"
          placeholder="Gender"
          options={GENDER_OPTIONS}
          defaultOption="Gender"
          control={control}
          errors={errors}
        />
        <Input
          label="Phone Number*"
          placeholder="Eg. +233 241 23 456"
          name="phoneNumber"
          control={control}
          errors={errors}
        />
        <Input
          label="WhatsApp Number*"
          placeholder="Eg. +233 241 23 456"
          name="whatsappNumber"
          control={control}
          errors={errors}
        />
        <Divider />
        <Select
          label="Marital Status*"
          name="maritalStatus"
          placeholder="Marital Status"
          options={MARITAL_STATUS_OPTIONS}
          defaultOption="Marital Status"
          control={control}
          errors={errors}
        />
        <Input
          label="Occupation"
          name="occupation"
          placeholder="Occupation"
          aria-describedby="occupationHelp"
          control={control}
          errors={errors}
        />
        <Text size="xs">
          Date of Birth*{' '}
          <Text as="i" className="text-secondary">
            (Day/Month/Year)
          </Text>
        </Text>
        <Input
          name="dob"
          type="date"
          placeholder="dd/mm/yyyy"
          aria-describedby="dateofbirth"
          control={control}
          errors={errors}
        />
        {/* <!--End of Basic Info Section--> */}
        {/* <!-- Beginning of Church Info Section--> */}
        <Heading>Church Info</Heading>
        <Input
          label="Home/Campus Location * (for IDL)"
          name="visitationArea"
          placeholder="Enter the location for IDL Visitaion"
          aria-describedby="visitationArea"
          control={control}
          errors={errors}
        />
        <Input
          label="Fellowship Code"
          name="fellowshipCode"
          placeholder="Enter Your Fellowship Code"
          aria-describedby="fellowshipCode"
          control={control}
          errors={errors}
        />
        <FellowshipCodeInputMessage
          watchedFellowshipCode={watch('fellowshipCode')}
        />

        <Container marginTop={10} textAlign="center" paddingX={0}>
          <ButtonGroup size="lg">
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="whatsapp"
            >
              Submit
            </Button>
          </ButtonGroup>
        </Container>
      </form>
    </Container>
  )
}

export default CreateProfile
