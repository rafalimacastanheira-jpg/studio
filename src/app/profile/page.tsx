"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRatings } from '@/hooks/use-ratings';
import { TITLES_DATA } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { ratingsByUser } = useRatings();
  
  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div className="text-center py-16">A redirecionar...</div>;
  }
  
  const userRatings = ratingsByUser(user.id);

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">O Meu Perfil</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted-foreground w-20">Nome:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted-foreground w-20">Email:</span>
            <span>{user.email}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>As Minhas Avaliações</CardTitle>
          <CardDescription>
            Aqui estão todos os títulos que avaliou.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="text-center">A sua Nota</TableHead>
                  <TableHead className="text-right">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userRatings.length > 0 ? (
                  userRatings.map(rating => {
                    const title = TITLES_DATA.find(t => t.id === rating.titleId);
                    return (
                      <TableRow key={rating.titleId}>
                        <TableCell className="font-medium">
                          {title ? <Link href={`/title/${title.slug}`} className="hover:underline">{title.name}</Link> : `#${rating.titleId}`}
                        </TableCell>
                        <TableCell className="text-center">
                           <Badge variant="secondary" className="flex items-center gap-1 w-fit mx-auto">
                              <Star className="w-3 h-3 text-primary fill-current" />
                              <span className="font-bold">{rating.score.toFixed(1)}</span>
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {new Date(rating.ts).toLocaleDateString('pt-PT')}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                      Ainda não avaliou nenhum título.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
