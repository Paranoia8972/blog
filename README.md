# Encryptopia Blog

This blog is built using [Next.js](https://nextjs.org/) and supports markdown-based posts.

## Features

- Markdown-based posts
- RSS Feed
- SEO-friendly
- Custom components for enriched content
- Easily extendable

## Setup

### Configuration

The blog configuration is managed in `siteConfig` inside `config/site.ts`:

```typescript
export const siteConfig = {
  name: "Encryptopia Blog",
  url: "https://blog.encryptopia.dev",
  description: "My weird knowledge, noted down.",
  author: "Clemens Hoffmann",
  email: "contact@encryptopia.dev",
  links: {
    twitter: "https://twitter.com/paranoia8972",
    github: "https://github.com/Paranoia8972",
    personalSite: "https://encryptopia.dev",
    feed: "https://blog.encryptopia.dev/feed.xml",
    // Add more links if needed
  },
};
```

Ensure that the correct values are set for your blog’s name, URL, author details, and social links.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Paranoia8972/blog.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd blog
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Update the configuration:**

   Edit the `config/site.ts` file to reflect your personal settings.

## Running the Blog Locally

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Access the blog:**

   Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Creating New Posts

To create a new blog post:

1. **Navigate to the `posts` directory:**

   ```bash
   cd content/post
   ```

2. **Create a new MDX file:**

   ```bash
   touch my-new-post.mdx
   ```

3. **Write your post using frontmatter:**

```markdown
    ---
    title: My new Post
    description: Welcome to my new post.
    date: 2024-08-18
    tags:
        - post
        - test
    published: true <!-- Optionally -->
    img: /new-post.png
    ---

    # My New Post

    Welcome to my new post. Here’s some interesting content!
```

4. **Save and commit your changes:**

   ```bash
   git add posts/my-new-post.md
   git commit -m "Add new post"
   git push origin main
   ```

## Custom Components
<!--
Encryptopia Blog supports custom React components that can be used within your markdown files. Here’s how to use them:

1. **Create your component** inside the `components` directory, e.g., `Alert.tsx`:

   ```tsx
   const Alert = ({ message }) => (
     <div className="alert alert-warning">
       {message}
     </div>
   );

   export default Alert;
   ```

2. **Use the component in a markdown file:**

   ```markdown
   ---
   title: "Using Custom Components"
   date: "2024-08-18"
   ---

   # Custom Components

   Here's an example of using the `Alert` component:

   <Alert message="This is an important message!" />
   ```

   Make sure your components are properly exported and accessible to your markdown renderer.
-->
## Deployment

To deploy the blog, follow the Next.js deployment guide for your hosting platform (e.g., Vercel, Netlify, etc.).

For example, with Vercel:

1. **Install the Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy the project:**

   ```bash
   vercel
   ```

For other platforms, refer to the respective deployment guides.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
