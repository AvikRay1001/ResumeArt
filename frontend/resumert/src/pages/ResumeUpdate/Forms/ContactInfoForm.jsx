import React from 'react'
import Input from '../../../components/Inputs/Input'

const ContactInfoForm = ({contactData, updateSection}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>
            Contact Information
        </h2>

        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='col-span-2'>
                <Input
                    label="Address"
                    placeholder="Short Address"
                    type="text"
                    value={contactData.location || ""}
                    onChange={({target}) => updateSection("location", target.value)}
                />
            </div>

            <Input
                label="Email"
                placeholder="name@example.com"
                type="email"
                value={contactData.email || ""}
                onChange={({target}) => updateSection("email", target.value)}
            />
            
            <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                type="telephone"
                value={contactData.phone || ""}
                onChange={({target}) => updateSection("phone", target.value)}
            />

            <Input
                label="LinkedIn"
                placeholder="https://linkedin.com/in/username"
                type="url"
                value={contactData.linkedin || ""}
                onChange={({target}) => updateSection("linkedin", target.value)}
            />

            <Input
                label="GitHub"
                placeholder="https://github.com/username"
                type="url"
                value={contactData.github || ""}
                onChange={({target}) => updateSection("github", target.value)}
            />

            <div className='md:col-span-2'>
                <Input
                    label="Portfolio / Website"
                    placeholder="https://yourwebsite.com"
                    type="url"
                    value={contactData.website || ""}
                    onChange={({target}) => updateSection("website", target.value)}
                />
            </div>
        </div>
    </div>
  )
}

export default ContactInfoForm