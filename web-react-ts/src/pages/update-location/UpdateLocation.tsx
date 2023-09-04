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
import * as Yup from 'yup'
import React, { useState } from 'react'
import { useUser } from 'contexts/UserContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Select } from '@jaedag/admin-portal-react-core'
import { LOCATION_OPTIONS, LOCATION_SELECTION_OPTIONS } from 'utils/constants'

const UpdateLocation = () => {
  const { user } = useUser()
  const [error, setError] = useState('')
  const [positionLoading, setPositionLoading] = useState(false)
  const initialValues = {
    locationOptions: 'home',
    locationSettingMethod: 'automatic',
    latitude: 0.0,
    longitude: 0.0,
    landmark: '',
  }

  //   const navigate = useNavigate()

  const validationSchema = Yup.object({
    locationOptions: Yup.string().required(),
    locationSettingMethod: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    landmark: Yup.string().required(),
  })

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<typeof initialValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  const onSubmit = async (values: typeof initialValues) => {
    try {
      console.log('values', values)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <Container marginY={5}>
      <Card variant="outline">
        <CardHeader>
          <Heading>Update Your Location</Heading>
        </CardHeader>
        <CardBody>
          <Box paddingBottom={10}>
            <Text>Hi {user.firstName}</Text>
            <Text>
              You can update your location by filling the simple form below.
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
            <Select
              name="locationOptions"
              label="Choose A Location To Update"
              options={LOCATION_OPTIONS}
              control={control}
              errors={errors}
            />

            <Select
              name="locationSettingMethod"
              label="Choose What Method You Want To Use"
              options={LOCATION_SELECTION_OPTIONS}
              control={control}
              errors={errors}
            />

            <Input
              name="landmark"
              label="Choose A Landmark Or Name Of An Area To Help Us Locate You"
              control={control}
              errors={errors}
              placeholder="eg. Behind Accra Mall"
            />
            {watch('locationSettingMethod') === 'automatic' && (
              <Button
                marginTop={5}
                colorScheme="blue"
                isLoading={positionLoading}
                loadingText="Getting Position"
                onClick={() => {
                  setPositionLoading(true)

                  window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                      setValue('latitude', position.coords.latitude)
                      setValue('longitude', position.coords.longitude)
                      setPositionLoading(false)
                    }
                  )
                }}
              >
                Get Location
              </Button>
            )}
            {watch('locationSettingMethod') === 'manual' && (
              <>
                <Input
                  name="latitude"
                  label="Latitude"
                  control={control}
                  errors={errors}
                  placeholder="eg. 5.6037"
                />

                <Input
                  name="longitude"
                  label="Longitude"
                  control={control}
                  errors={errors}
                  placeholder="eg. -0.1870"
                />
              </>
            )}

            {error && (
              <Alert status="error" marginTop={5}>
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!!watch('latitude') && !!watch('longitude') && (
              <Alert status="success" marginTop={5}>
                <AlertIcon />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Location Captured</AlertDescription>
              </Alert>
            )}
            <Center>
              <Button
                marginTop={10}
                type="submit"
                paddingX={20}
                isLoading={isSubmitting}
                colorScheme="whatsapp"
              >
                Submit
              </Button>
            </Center>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}

export default UpdateLocation
