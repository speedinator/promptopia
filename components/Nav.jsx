'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'



const Nav = () => {

    const { data: session } = useSession()
    const { status: status } = useSession()

    // console.log(test)
    // console.log(test2)
    // console.log(useSession())
    // const session?.user = true
    const [providers, setProviders] = useState(null)
    const [toogleDropdown, setToogleDropdown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response)
            // console.log(providers)
        }
        setUpProviders()
    }, [])
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>

                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt="test"
                    className='object-contain'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>

            {/* {alert(session?.user) } */}

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>

                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src={session?.user?.image}
                                alt="test"
                                width={37}
                                height={37}
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key="provider.name"
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In with {provider.name}
                                </button>
                            ))}
                    </>


                )
                }
            </div>

            {/* Mobile Navigation */}

            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user?.image}
                            width={37}
                            height={37}
                            alt="test"
                            className='rounded-full'

                            onClick={() => setToogleDropdown((prev) => !prev)}
                        />

                        {toogleDropdown && (
                            <div className="dropdown">
                                <Link href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToogleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link href="/create-prompt"
                                    className='dropdown_link'
                                    onClick={() => setToogleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToogleDropdown(false)
                                        signOut()
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out

                                </button>

                            </div>)

                        }
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key="provider.name"
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In with {provider.name}
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav