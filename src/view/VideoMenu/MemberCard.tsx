import React from 'react'

type MemberCardType ={
  id: number;
  profile_url: string
}
type MemberType ={
  id: number;
  profile_url: string;
}

const dummyMember: MemberType [] = [
  {
    id: 0,
    profile_url: "https://m.media-amazon.com/images/I/41jLBhDISxL._SX466_.jpg",
  },
  {
    id: 1,
    profile_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnqJCYZv9m6aHc_3OYHl4Jjnc9WwY-Ctuumw&s",
  },
  {
    id: 2,
    profile_url: "https://cdn-icons-png.flaticon.com/128/10551/10551812.png",
  },
  {
    id: 3,
    profile_url: "https://m.media-amazon.com/images/I/41IK02LISNL._SX466_.jpg",
  }
]
const MemberCard:React.FC<MemberCardType> = (props) => {
  return (
    <div className='h-full w-full border-2 min-h-[150px] rounded-xl bg-blue-300'  key={props.id}>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='w-[80px] h-[80px] rounded-full'>
          <img src={props?.profile_url || dummyMember[0].profile_url} className='w-full h-full rounded-full' alt='Profile-logo'/>
        </div>
      </div>
    </div>
  )
}

export default MemberCard