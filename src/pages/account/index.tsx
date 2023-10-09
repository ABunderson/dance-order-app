import Layout from 'components/Layout'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react"


export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
      <Layout pageTitle='Login'>

        <h1>Important!</h1>
        <p>This page is only for florists affiliated with the site. If you are not a florist please go back to the home page by clicking on the logo at the top.</p>

        <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>
                Username
                <input name="username" type="text" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button type="submit">Sign in</button>
        </form>
      </Layout>
    )
  }

  export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }
    // async function onSubmit(event) {
    //     event.preventDefault()
    //     console.log(event);

    //     const formData = new FormData(event.target)
    //     const response = await fetch('api/user/login.js', {
    //         method: 'POST',
    //         body: formData,
    //     })

    //     // Handle response if necessary
    //     const data = await response.json()
    //     // ...
    // }

//     return (
//         <Layout pageTitle='Login'>
//             <h1>Important!</h1>
//             <p>This page is only for florists affiliated with the site. If you are not a florist please go back to the home page by clicking on the logo at the top.</p>
            
//             {/* <form onSubmit={onSubmit}>
//                 <input type="text" name="userName" />
//                 <input type="text" name="password" />
//                 <button type="submit">Submit</button>
//             </form> */}

//         </Layout>
//     )
// }