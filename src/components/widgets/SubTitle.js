import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SubTitle = ({ title, icon }) => {
	return (
		<div className='text-secondary font-bold pb-3 pt-1'>
			<FontAwesomeIcon icon={icon || faAngleRight} fixedWidth />
			{title}
		</div>
	)
}
