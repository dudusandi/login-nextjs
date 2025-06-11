import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Se a URL tiver um erro vindo do Next-Auth, exibe-o
  if (router.query.error && !error) {
    setError('E-mail ou senha inválidos. Por favor, tente novamente.');
  }

  const handleCredentialsSignIn = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false, // Não redireciona automaticamente
      email,
      password,
    });

    if (result.error) {
      setError('E-mail ou senha inválidos. Por favor, tente novamente.');
    } else {
      router.push('/'); // Redireciona para a página principal em caso de sucesso
    }
  };


  if (session) {
    return (
      <>
        <Head>
          <title>Autenticado - {session.user.name}</title>
        </Head>
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-lg">
            <img
              src={session.user.image || `https://avatar.vercel.sh/${session.user.email}`}
              alt={`Foto de ${session.user.name}`}
              className="mx-auto h-24 w-24 rounded-full"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Bem-vindo, {session.user.name}!
            </h2>
            <p className="mt-2 text-gray-600">{session.user.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="mt-6 w-full rounded-md bg-red-500 px-4 py-2 font-bold text-white transition-colors hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="text-center text-3xl font-bold text-gray-800">Acesse sua Conta</h1>
          
          <form onSubmit={handleCredentialsSignIn} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Senha"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="my-6 flex items-center justify-center">
            <div className="h-px w-full bg-gray-300"></div>
            <p className="mx-4 flex-shrink-0 text-gray-500">OU</p>
            <div className="h-px w-full bg-gray-300"></div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </>
  );
} 