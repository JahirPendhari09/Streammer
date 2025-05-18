import MemberCard from "./MemberCard"

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

const Members = () => {
  return (
    <div className='w-full h-full'>
      <div className='h-full w-full flex flex-col gap-4 overflow-y-auto whitespace-nowrap scroll-smooth no-scrollbar'>
        {
          dummyMember.length > 0 && dummyMember.map((member) => <MemberCard {...member} />)
        }
      </div>
    </div>
  )
}

export default Members


