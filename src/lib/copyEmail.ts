import { toast } from "@/hooks/use-toast";

/**
 * Copies an email address to the clipboard and shows a confirmation toast.
 * Designed to be attached to onClick of any element representing an email.
 *
 * Usage:
 *   <a href="mailto:foo@bar.com" onClick={copyEmailHandler("foo@bar.com")}>foo@bar.com</a>
 */
export const copyEmailToClipboard = async (email: string) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    toast({
      title: "Email copied",
      description: `${email} is on your clipboard.`,
    });
  } catch {
    toast({
      title: "Couldn't copy email",
      description: email,
      variant: "destructive",
    });
  }
};

export const copyEmailHandler =
  (email: string) =>
  (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    void copyEmailToClipboard(email);
  };
