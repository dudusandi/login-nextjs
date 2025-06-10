import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import LoginPage from './login';

export default function HomePage() {
  const { data: session, status } = useSession();

  // Mostra a página de login completa se não estiver autenticado
  if (status !== 'authenticated') {
    return <LoginPage />;
  }

  // Se autenticado, mostra uma dashboard simples
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800">
            Página Principal
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Você está autenticado com sucesso!
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="text-blue-500 hover:underline"
            >
              Ver detalhes da sua conta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 