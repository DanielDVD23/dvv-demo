"use client";

import { useState } from "react";
import type { Role } from "@/types/roles";
import { kbArticles, kbCategories, kbRoleTiles, type KBArticle } from "@/data/knowledgeBase";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

interface KnowledgeBaseProps {
  role: Role;
  onNavigate: (screen: string) => void;
}

export default function KnowledgeBase({ role, onNavigate }: KnowledgeBaseProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<KBArticle | null>(null);
  const [feedback, setFeedback] = useState<Record<string, boolean | null>>({});

  // Filter articles
  const filteredArticles = kbArticles.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !selectedCategory || a.category === selectedCategory;
    const matchesRole = !selectedRole || a.roles.includes(selectedRole);
    return matchesSearch && matchesCategory && matchesRole;
  });

  // Search results preview (Algolia-style)
  const searchResults = search.length >= 2 ? filteredArticles.slice(0, 5) : [];

  function handleFeedback(articleId: string, helpful: boolean) {
    setFeedback((prev) => ({ ...prev, [articleId]: helpful }));
  }

  function getRelatedArticles(article: KBArticle): KBArticle[] {
    if (!article.relatedArticles) return [];
    return article.relatedArticles
      .map((id) => kbArticles.find((a) => a.id === id))
      .filter(Boolean) as KBArticle[];
  }

  // Article Detail View
  if (selectedArticle) {
    const related = getRelatedArticles(selectedArticle);
    const articleFeedback = feedback[selectedArticle.id];

    return (
      <div className="animate-fadeIn max-w-[800px]">
        <button
          className="flex items-center gap-1.5 text-xs text-accent font-semibold mb-4 cursor-pointer hover:underline bg-transparent border-0 p-0"
          onClick={() => setSelectedArticle(null)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          Zurück zur Übersicht
        </button>

        {/* Article header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge color="purple">{kbCategories.find((c) => c.id === selectedArticle.category)?.label || selectedArticle.category}</Badge>
            {selectedArticle.roles.map((r) => (
              <span key={r} className="text-[10px] bg-s2 border border-border rounded-full px-2 py-0.5 text-text-muted capitalize">{r}</span>
            ))}
          </div>
          <h1 className="text-[22px] font-bold mb-2">{selectedArticle.title}</h1>
          <p className="text-[13px] text-text-muted">{selectedArticle.summary}</p>
        </div>

        {/* Article content (markdown-like rendering) */}
        <div className="bg-s1 border border-border rounded-[10px] p-6 mb-6">
          <div className="prose-sm text-[13px] text-text-dim leading-relaxed whitespace-pre-line">
            {selectedArticle.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="text-[16px] font-bold text-text mt-4 mb-2">{line.replace("## ", "")}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-[14px] font-bold text-text mt-3 mb-1.5">{line.replace("### ", "")}</h3>;
              if (line.startsWith("- **")) {
                const parts = line.replace("- **", "").split("**");
                return <div key={i} className="flex gap-2 ml-4 mb-1"><span className="text-accent">&#8226;</span><span><strong className="text-text">{parts[0]}</strong>{parts[1]}</span></div>;
              }
              if (line.startsWith("- ")) return <div key={i} className="flex gap-2 ml-4 mb-1"><span className="text-accent">&#8226;</span><span>{line.replace("- ", "")}</span></div>;
              if (line.match(/^\d+\. /)) return <div key={i} className="flex gap-2 ml-4 mb-1"><span className="font-bold text-accent min-w-[18px]">{line.match(/^\d+/)![0]}.</span><span>{line.replace(/^\d+\. /, "")}</span></div>;
              if (line.startsWith("|")) return null; // Skip table rendering for simplicity
              if (line.trim() === "") return <div key={i} className="h-2" />;
              return <p key={i} className="mb-1">{line}</p>;
            })}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-s2 border border-border rounded-[10px] p-4 mb-6">
          <div className="text-sm font-bold mb-2">Hat dieser Artikel geholfen?</div>
          {articleFeedback === null || articleFeedback === undefined ? (
            <div className="flex gap-2">
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-dim border border-[rgba(22,163,74,0.2)] text-green text-[13px] font-medium cursor-pointer hover:bg-green hover:text-white transition-colors"
                onClick={() => handleFeedback(selectedArticle.id, true)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                Ja, hilfreich
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-dim border border-[rgba(239,68,68,0.2)] text-red text-[13px] font-medium cursor-pointer hover:bg-red hover:text-white transition-colors"
                onClick={() => handleFeedback(selectedArticle.id, false)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" /></svg>
                Nein
              </button>
            </div>
          ) : (
            <div className={`text-[13px] font-medium ${articleFeedback ? "text-green" : "text-orange"}`}>
              {articleFeedback ? "Danke f\u00fcr dein Feedback!" : "Danke! Wir werden den Artikel verbessern."}
            </div>
          )}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">\u00c4hnliche Artikel</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {related.map((a) => (
                <div
                  key={a.id}
                  className="bg-s1 border border-border rounded-[10px] p-3.5 cursor-pointer hover:bg-s2 hover:-translate-y-px transition-all"
                  onClick={() => { setSelectedArticle(a); window.scrollTo(0, 0); }}
                >
                  <div className="text-[13px] font-semibold mb-1">{a.title}</div>
                  <div className="text-[11px] text-text-muted line-clamp-2">{a.summary}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Knowledge Base View
  return (
    <div className="animate-fadeIn">
      <h1 className="text-[22px] font-bold mb-1">Wissensdatenbank</h1>
      <p className="text-[13px] text-text-muted mb-6">Finde Anleitungen, Hilfe-Artikel und Antworten auf h\u00e4ufige Fragen.</p>

      {/* Global Search */}
      <div className="relative mb-8">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelectedCategory(null); setSelectedRole(null); }}
            placeholder="Artikel durchsuchen... (z.B. Spieltag, Rechnung, Passwort)"
            className="!pl-12 !h-12 !text-[14px] !rounded-xl !border-2 focus:!border-accent !shadow-sm"
          />
          {search && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-1 text-text-muted hover:text-text"
              onClick={() => setSearch("")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {search.length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-s1 border border-border rounded-xl shadow-xl z-50 overflow-hidden">
            {searchResults.length === 0 ? (
              <div className="p-4 text-center text-[13px] text-text-muted">Keine Ergebnisse f\u00fcr &ldquo;{search}&rdquo;</div>
            ) : (
              <>
                {searchResults.map((article) => (
                  <div
                    key={article.id}
                    className="px-4 py-3 hover:bg-s2 cursor-pointer transition-colors border-b border-border last:border-b-0"
                    onClick={() => { setSelectedArticle(article); setSearch(""); }}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-accent font-semibold uppercase">{kbCategories.find((c) => c.id === article.category)?.label}</span>
                    </div>
                    <div className="text-[13px] font-semibold">{article.title}</div>
                    <div className="text-[11px] text-text-muted truncate">{article.summary}</div>
                  </div>
                ))}
                {filteredArticles.length > 5 && (
                  <div className="px-4 py-2.5 bg-s2 text-center">
                    <button
                      className="text-[12px] text-accent font-semibold cursor-pointer bg-transparent border-0 hover:underline"
                      onClick={() => setSearch(search)}
                    >
                      Alle {filteredArticles.length} Ergebnisse anzeigen
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Role-Based Tiles */}
      {!selectedCategory && !search && (
        <div className="mb-8">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Nach Rolle filtern</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {kbRoleTiles.map((tile) => {
              const isActive = selectedRole === tile.role;
              const articleCount = kbArticles.filter((a) => a.roles.includes(tile.role)).length;
              return (
                <div
                  key={tile.role}
                  className={`relative overflow-hidden rounded-[12px] p-5 cursor-pointer transition-all hover:-translate-y-px ${
                    isActive ? "ring-2 ring-accent ring-offset-2" : ""
                  }`}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
                      : "linear-gradient(135deg, #f8f7fc, #ede9fe)",
                  }}
                  onClick={() => setSelectedRole(isActive ? null : tile.role)}
                >
                  <div className={`text-[15px] font-bold mb-1 ${isActive ? "text-white" : "text-text"}`}>{tile.label}</div>
                  <div className={`text-[12px] mb-2 ${isActive ? "text-white/70" : "text-text-muted"}`}>{tile.desc}</div>
                  <div className={`text-[11px] font-semibold ${isActive ? "text-white/80" : "text-accent"}`}>{articleCount} Artikel</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Grid */}
      {!search && (
        <div className="mb-8">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
            {selectedRole ? `Kategorien f\u00fcr ${kbRoleTiles.find((t) => t.role === selectedRole)?.label || ""}` : "Kategorien"}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {kbCategories.map((cat) => {
              const catArticles = kbArticles.filter(
                (a) => a.category === cat.id && (!selectedRole || a.roles.includes(selectedRole))
              );
              if (selectedRole && catArticles.length === 0) return null;
              const isActive = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`bg-s1 border rounded-[10px] p-4 cursor-pointer transition-all hover:bg-s2 hover:-translate-y-px ${
                    isActive ? "border-accent bg-accent-dim" : "border-border"
                  }`}
                  onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                >
                  <div className="mb-2">
                    <Icon name={cat.icon} size={22} className="text-accent" />
                  </div>
                  <div className="text-sm font-bold mb-0.5">{cat.label}</div>
                  <div className="text-[11px] text-text-muted">{catArticles.length} Artikel</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Article List */}
      {(selectedCategory || selectedRole || search) && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider">
              {filteredArticles.length} Artikel{filteredArticles.length !== 1 ? "" : ""}
              {selectedCategory && ` in ${kbCategories.find((c) => c.id === selectedCategory)?.label}`}
            </div>
            {(selectedCategory || selectedRole) && (
              <button
                className="text-xs text-accent font-semibold cursor-pointer hover:underline bg-transparent border-0"
                onClick={() => { setSelectedCategory(null); setSelectedRole(null); }}
              >
                Filter zur\u00fccksetzen
              </button>
            )}
          </div>
          <div className="space-y-2">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-s1 border border-border rounded-[10px] p-4 cursor-pointer hover:bg-s2 hover:-translate-y-px transition-all"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-accent font-semibold uppercase">
                        {kbCategories.find((c) => c.id === article.category)?.label}
                      </span>
                      {article.roles.length < 3 && article.roles.map((r) => (
                        <span key={r} className="text-[9px] bg-s2 border border-border rounded-full px-1.5 py-0.5 text-text-muted capitalize">{r}</span>
                      ))}
                    </div>
                    <div className="text-[13px] font-semibold mb-1">{article.title}</div>
                    <div className="text-[12px] text-text-muted line-clamp-2">{article.summary}</div>
                  </div>
                  <svg className="shrink-0 text-text-muted mt-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedCategory && !selectedRole && !search && (
        <div className="mt-4 bg-s2 border border-border rounded-[10px] p-5 text-center">
          <div className="text-sm text-text-muted">W\u00e4hle eine Kategorie, Rolle oder nutze die Suche, um Artikel zu finden.</div>
        </div>
      )}
    </div>
  );
}
