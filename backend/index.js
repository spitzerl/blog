import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();
const prisma = new PrismaClient();

dotenv.config();

app.use(express.json());

// Récupérer tous les posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true
      }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupérer un post par son id
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        author: true,
        comments: true
      }
    });
    if (!post) return res.status(404).json({ error: 'Post non trouvé' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Créer un nouveau post
app.post('/api/posts', async (req, res) => {
  const { title, content, excerpt, coverImage, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: { 
        title, 
        content, // Markdown content
        excerpt, // Optionnel
        coverImage, // Optionnel
        authorId 
      }
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Mettre à jour un post
app.put('/api/posts/:id', async (req, res) => {
  const { title, content, excerpt, coverImage } = req.body;
  try {
    const updateData = { title, content };
    
    // Ajouter les champs optionnels s'ils sont fournis
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    
    const post = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: updateData
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Supprimer un post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await prisma.post.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

const PORT = process.env.BACKEND_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend lancé sur http://localhost:${PORT}`);
});
