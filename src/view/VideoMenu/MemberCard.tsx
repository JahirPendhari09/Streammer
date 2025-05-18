import React from 'react'

type MemberCardType ={
  id: number;
  profile_url: string
}

const MemberCard:React.FC<MemberCardType> = (props) => {
  return (
    <div className='h-full w-full border-2 min-h-[150px] rounded-xl bg-blue-300'  key={props.id}>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='w-[80px] h-[80px] rounded-full'>
          <img src={props.profile_url} className='w-full h-full rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default MemberCard