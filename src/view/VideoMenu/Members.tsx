import MemberCard from "./MemberCard"

const Members = ({peoples}:any) => {
  return (
    <div className='w-full h-full'>
      <div className='h-full w-full flex flex-col gap-4 overflow-y-auto whitespace-nowrap scroll-smooth no-scrollbar'>
        {
          peoples.length > 0 && peoples.map((member:any) => <MemberCard {...member} />)
        }
      </div>
    </div>
  )
}

export default Members


