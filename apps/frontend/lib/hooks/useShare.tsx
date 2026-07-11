"use client";

export function useShare() {
  if (!navigator.share) {
    return { share: null };
  }

  return {
    share: async ({ title, text, url }: { title: string; text: string; url: string }) => {
      const data = {
        title: title,
        text: text,
        url: url,
      };

      await navigator.share(data);
    },
  };
}
