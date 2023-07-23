import { useQuery } from '@apollo/client'
import { useUser } from 'contexts/UserContext'
import React from 'react'
import {
  ApolloWrapper,
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
import { DISPLAY_MEMBER_BIO } from './memberProfileGQL'
import { CreateMemberFormOptions } from './member-profile-types'

const UpdateProfile = () => {
  const { user } = useUser()

  const { data, error, loading } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: user.id },
  })

  const member = data?.members[0]

  const initialValues: CreateMemberFormOptions = {
    firstName: member?.firstName ?? '',
    middleName: member?.middleName ?? '',
    lastName: member?.lastName ?? '',
    gender: member?.gender?.gender ?? '',
    phoneNumber: member?.phoneNumber ? `+${member?.phoneNumber}` : '',
    whatsappNumber: member?.whatsappNumber ? `+${member?.whatsappNumber}` : '',
    email: member?.email ?? '',
    dob: member?.dob ? member.dob.date : '',
    maritalStatus: member?.maritalStatus?.status ?? '',
    occupation: member?.occupation?.occupation ?? '',
    pictureUrl: member?.pictureUrl ?? '',
    visitationArea: member?.visitationArea ?? 'no-location',
    fellowshipCode: member?.fellowship.bankingCode,
  }

  const validationSchema = Yup.object({
    pictureUrl: Yup.string().required('You must upload a picture'),
    firstName: Yup.string().required('First Name is a required field'),
    lastName: Yup.string().required('Last Name is a required field'),
    gender: Yup.string().required('Gender is a required field'),
    email: Yup.string().email('Please enter a valid email address').trim(),
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

  const onSubmit = async (values: typeof initialValues) => {
    console.log(values)
  }

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<typeof initialValues>({
    resolver: yupResolver(
      validationSchema
    ) as unknown as Resolver<CreateMemberFormOptions>,
    defaultValues: initialValues,
  })

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
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

          <Input
            label="Email Address"
            name="email"
            placeholder="Enter Email Address"
            aria-describedby="emailHelp"
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
    </ApolloWrapper>
  )
}

export default UpdateProfile
