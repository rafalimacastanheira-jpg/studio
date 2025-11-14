import type { Title } from '@/lib/definitions';

export const TITLES_DATA: Title[] = [
  {
    id: 1,
    type: 'movie',
    name: 'Interstellar',
    year: 2014,
    synopsis: 'Uma equipa de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
    posterUrl: 'https://picsum.photos/seed/1/500/750',
    genres: ['Ficção Científica', 'Drama', 'Aventura'],
    imageHint: 'space wormhole'
  },
  {
    id: 2,
    type: 'series',
    name: 'Breaking Bad',
    year: 2008,
    synopsis: 'Um professor de química do liceu com cancro do pulmão inoperável vira-se para o fabrico e venda de metanfetaminas para garantir o futuro da sua família.',
    posterUrl: 'https://picsum.photos/seed/2/500/750',
    genres: ['Drama', 'Crime', 'Thriller'],
    imageHint: 'desert RV'
  },
  {
    id: 3,
    type: 'movie',
    name: 'The Matrix',
    year: 1999,
    synopsis: 'Um hacker de computador descobre uma realidade alternativa perturbadora e o seu papel na guerra contra os seus controladores.',
    posterUrl: 'https://picsum.photos/seed/3/500/750',
    genres: ['Ação', 'Ficção Científica'],
    imageHint: 'green code'
  },
  {
    id: 4,
    type: 'movie',
    name: 'Parasita',
    year: 2019,
    synopsis: 'A ganância e a discriminação de classe ameaçam a recém-formada relação simbiótica entre a rica família Park e o pobre clã Kim.',
    posterUrl: 'https://picsum.photos/seed/4/500/750',
    genres: ['Comédia', 'Thriller', 'Drama'],
    imageHint: 'family portrait'
  },
  {
    id: 5,
    type: 'series',
    name: 'A Guerra dos Tronos',
    year: 2011,
    synopsis: 'Nove famílias nobres lutam pelo controlo das terras míticas de Westeros, enquanto um antigo inimigo regressa após estar adormecido durante milénios.',
    posterUrl: 'https://picsum.photos/seed/5/500/750',
    genres: ['Ação', 'Aventura', 'Drama'],
    imageHint: 'iron throne'
  },
  {
    id: 6,
    type: 'movie',
    name: 'A Origem',
    year: 2010,
    synopsis: 'Um ladrão que rouba segredos corporativos através do uso da tecnologia de partilha de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um C.E.O.',
    posterUrl: 'https://picsum.photos/seed/6/500/750',
    genres: ['Ação', 'Aventura', 'Ficção Científica'],
    imageHint: 'spinning top'
  }
];

export const GENRES = [
  'Ação',
  'Aventura',
  'Comédia',
  'Crime',
  'Drama',
  'Ficção Científica',
  'Thriller'
];
