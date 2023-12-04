import Link from 'next/link'
import Layout from '../components/Layout'
import '../app/global.css'

const IndexPage = () => (
  <Layout title="WellnessMate - Homepage">

  <div>
    <div className=' w-screen h-screen flex items-center justify-around'>
      <Link href="/create">Create your own mealplan</Link>

      <Link href="/recipes">Browse recipes</Link>

    </div>
  </div>
  </Layout>

)

export default IndexPage
