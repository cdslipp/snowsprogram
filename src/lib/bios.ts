export interface Bio {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export const bios: Bio[] = [
  {
    id: "bo",
    name: "Bó Bárdos",
    role: "Co-Creator/Performer",
    bio: `Hungarian-born mezzo Bó (Margaret) Bárdos is based in Southern Ontario and loves touring. At home with classical as well as new, experimental music, she seeks out creative challenges and cherishes working with good hearted people. With a voice described by Opera Canada as "mellow, fruity, that caresses the ears", Canadian and European appearances include interdisciplinary collaborative and site-specific projects that make use of her varied training: from Butoh dance and physical theatre to extended vocal technique and improvisation. She is a grateful member of the studio of Tom Schilling, sits on the board for NUMUS and InterArts Matrix, and continues as Company Manager at MT Space in Kitchener. When not on stage, in the studio, or working with arts organizations, she can be found on the back of a horse, or meditating under her favourite clump of trees.`
  },
  {
    id: "paula",
    name: "Paula Bornacelli",
    role: "Stage Manager",
    bio: `Paula Bornacelli is a recent graduate of the Theatre and Performance program at the University of Waterloo with a focus towards pursuing Stage Management. Her largest work thus far, Stage Managing a University of Waterloo mainstage production, has further inspired her joy within the role and is excited to begin her professional theatre career.`
  },
  {
    id: "trevor",
    name: "Trevor Copp",
    role: "Co-Creator/Performer",
    bio: `Trevor Copp founded Hamilton's Tottering Biped Theatre (TBT) in 2009, known for its commitment to original, issue-driven, and intensely physical theatrical works. As a multifaceted theatre professional with over 20 years of experience, Trevor's expertise spans acting, partner dance, mime, and choreography. His career has taken him across classical and contemporary stages across Canada and in more than 40 cities worldwide.`
  },
  {
    id: "ric",
    name: "Ric Knowles",
    role: "Co-Creator/Director",
    bio: `Ric Knowles has worked for over 45 years on over 140 projects as a director and dramaturge at theatres ranging from Mulgrave Road to the Stratford Festival. His current work is with Tottering Biped, MT Space, Theatre Passe Muraille, Tarragon Theatre, and the National Arts Centre. See https://www.uoguelph.ca/arts/sotec/people/ric-knowles`
  },
  {
    id: "cameron",
    name: "Cameron Slipp",
    role: "Lighting Designer",
    bio: `Cameron Slipp is a stage manager, production manager, and technical director based in Kitchener, Ontario. Stage Manager: Suitcase, The Bell, I Don't Know, The Last 15 Seconds, Uncivilized. Production Manager: The Elora Festival '22, IMPACT '23, Green Light Arts, Unwrap Theatre, and MT Space. Lighting Designer: Homecoming, Before I Die, Sometimes It Snows in April. Co-technical director at The Registry Theatre in Kitchener. Founder of the Creative Co-op. Account Executive at Sherwood Systems.`
  },

];

export function getBioById(id: string): Bio | undefined {
  return bios.find(bio => bio.id === id);
} 