// import React from 'react'
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';

export const CheckboxTag = ({ title, ids, labels, states, setStates, counts, divider }) => (
	<>
		<div className='flex flex-column'>
			{title && <div>{title}</div>}
			<div className='flex gap-2'>
				{ids.map((item, index) => (
					<div className='flex align-items-center justify-content-center gap-1 pr-1' key={item}>
						<Checkbox inputId={item} checked={states[index]} onChange={e => setStates[index](e.checked)} />
						<div className='flex-column font-light'>
							<label htmlFor={item}>{labels[index]}</label>
							<div className='text-xs text-primary'>({counts[index]})</div>
						</div>
					</div>
				))
				}
			</div>
		</div>
		{divider && <Divider layout='vertical' style={{ margin: 0, padding: 0 }} />}
	</>
)