import React, { useEffect, useState } from 'react';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { toast } from 'react-toastify';
import Avatar from '../../components/Avatar';
import GridItem from '../../components/GridItem';
import Loading from '../../components/Loading';
import api from '../../services/api';

function Home() {

  // PAGE INNER STATES
  const [contact, setContact] = useState({})
  const [pageLoading, setPageLoading] = useState(true)


  // HANDLERS AND UTIL. FUNCTIONS
  const handleCapitalize = (word) => word ? word.charAt(0).toUpperCase() + word.slice(1) : word

  const handleLocation = (city, state) => `${handleCapitalize(city)}, ${handleCapitalize(state)}`

  const handleCompany = (company) => {
    const companyFormatted = {}
    companyFormatted.industry = handleCapitalize(company.industry)
    companyFormatted.location = handleLocation(company.locality[0], company.locality[1])
    companyFormatted.sizeRange = company.size_range
    companyFormatted.description = company.description
    companyFormatted.facebook = company.facebook_url
    companyFormatted.twitter = company.twitter_url

    return companyFormatted
  }

  const handleFormatPhone = (phone) => {

    return `(${phone.slice(1, 4)}) ${phone.slice(4, 8)}-${phone.slice(8)}`

  }

  const getPrimaryPhone = (phones) => {
    const [primaryPhone] = phones.filter(phone => phone.primary)

    const formattedPhone = handleFormatPhone(primaryPhone.number)

    return formattedPhone
  }

  const joinNames = (names) => {

    const newNames = names.map(name => handleCapitalize(name))

    return newNames.join(' ')

  }

  const handleContactResponse = (data) => {

    const actualContact = {}

    const { first_name,
      last_name,
      roles,
      company_name,
      twitter,
      facebook,
      linkedin,
      phone_numbers,
      profile_pic,
      city,
      state,
    } = data?.person

    const company = data?.company

    actualContact.fullName = joinNames([first_name, last_name])
    actualContact.role = joinNames(roles[0].split(" "))
    actualContact.companyName = joinNames([company_name])
    actualContact.twitter = twitter
    actualContact.facebook = facebook
    actualContact.linkedin = linkedin
    actualContact.phoneNumber = getPrimaryPhone(phone_numbers)
    actualContact.profilePic = profile_pic
    actualContact.location = handleLocation(city, state)
    actualContact.company = handleCompany(company)

    setContact(actualContact)
  }

  // API CALL
  async function getContact() {
    setPageLoading(true)

    try {

      const response = await api.get('/contact')

      if (response.data) {
        setPageLoading(false)
        handleContactResponse(response.data)
      }
    }

    catch (e) {
      toast.error('Houve um erro ao carregar as informações')
    }

  }


  // PAGE STATES
  useEffect(() => {
    getContact()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='flex justify-center'>
      {
        pageLoading ?
          <Loading />
          :
          <div className='flex flex-col justify-center items-center mt-10 shadow m-12 w-96'>

            <div className='flex items-center justify-between w-full text-gray-400 px-4 mb-12 py-5 border-b'>
              <p className='font-semibold'>Contact Details</p>
              <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <Avatar pic={contact.profilePic} />

            <div className='flex flex-col items-center justify-center mb-4'>
              <h2 className='text-black font-bold text-xl'>{contact.fullName}</h2>
              <p className='text-gray-400 font-semibold' > {contact.role} at <span className='text-blue-500'>{contact.companyName}</span></p>
            </div>

            <div className='flex space-x-2 mb-8' >
              <div className='text-gray-400 p-1 bg-transparent border-2 rounded-xl text-xl'>
                <a href={`https://${contact.facebook}`} target="_blank" rel="noopener noreferrer">
                  <FiFacebook />
                </a>
              </div>
              <div className='text-gray-400 p-1 bg-transparent border-2 rounded-xl text-xl'>
                <a href={`https://${contact.twitter}`} target="_blank" rel="noopener noreferrer">
                  <FiTwitter />
                </a>
              </div>
              <div className='text-gray-400 p-1 bg-transparent border-2 rounded-xl text-xl'>
                <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <FiLinkedin />
                </a>
              </div>
            </div>

            <div className='grid grid-cols-2 px-4 w-full'>
              <GridItem title='Phone' body={contact.phoneNumber} />
              <GridItem title='Local Time' body={`10:13 AM CDT`} />
              <GridItem title='Location' body={contact?.location} />
            </div>

            <div className='w-full mb-4'>
              <h2 className='px-4 text-gray-400 font-semibold mb-2 text-lg'>Company Info</h2>
              <div className='grid grid-cols-2 px-4 w-full'>
                <GridItem title='Industry' body={contact.company?.industry} />
                <GridItem title='Location' body={contact.company?.location} />
                <GridItem title='Funding' body={`$917M`} />
                <GridItem title='Employee count' body={contact.company?.sizeRange} />
                <GridItem title='Company description' body={contact.company?.description} className='col-span-2' />
                <GridItem title='Social Media'
                  body={
                    <div className='flex space-x-2'>
                      <a href={`https://${contact.company?.facebook}`} target="_blank" rel="noopener noreferrer">
                        <FiFacebook />
                      </a>
                      <a href={`https://${contact?.company?.twitter}`} target="_blank" rel="noopener noreferrer">
                        <FiTwitter />
                      </a>
                    </div>
                  }
                  className='col-span-2'
                />

              </div>
            </div>
          </div>
      }
    </div>
  );
}

export default Home;