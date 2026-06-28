"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { SearchBar } from "@/components/SearchBar";
import type { PostMeta } from "@/types/post";

type BlogExplorerProps = {
  posts: PostMeta[];
  categories: string[];
};

export function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "Todos" || post.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [post.title, post.description, post.category, post.keywords.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="grid gap-4 rounded-[8px] border border-[#5A0F18]/10 bg-[#FFF7E8] p-4 lg:grid-cols-[1fr_auto]">
        <SearchBar value={query} onChange={setQuery} />
        <label className="sr-only" htmlFor="category-filter">
          Filtrar por categoría
        </label>
        <select
          id="category-filter"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-full border border-[#5A0F18]/15 bg-white px-5 py-3 text-sm font-semibold text-[#5A0F18] outline-none"
        >
          <option>Todos</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      {filteredPosts.length === 0 ? (
        <div className="mt-8 rounded-[8px] border border-[#5A0F18]/10 bg-white p-8 text-center">
          <p className="font-semibold text-[#5A0F18]">No encontramos artículos con ese criterio.</p>
          <p className="mt-2 text-sm text-[#1F1F1F]/60">Prueba con otra palabra o categoría.</p>
        </div>
      ) : null}
    </div>
  );
}
