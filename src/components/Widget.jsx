import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import tailwindStyles from "../index.css?inline";
import supabase from "../supabaseClient";

export const Widget = ({ projectId }) => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  const onSelectStar = (index) => {
    setRating(index + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      p_project_key: projectId,
      p_user_name: form.name.value,
      p_user_email: form.email.value,
      p_message: form.feedback.value,
      p_rating: rating,
    };
    const { data: returnedData, error } = await supabase.rpc("add_feedback", data);
    setSubmitted(true);
    console.log(returnedData);
    console.log(error);
  };

  if (!projectId)
    return (
      <>
        <div className="widget fixed bottom-4 right-4 z-50">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full shadow-lg hover:scale-105 bg-red-500 hover:bg-red-700">
                <MessageCircleIcon className="mr-2 h-5 w-5" />
                Feedback
              </Button>
            </PopoverTrigger>
            <PopoverContent className="widget rounded-lg bg-card p-4 shadpw-lg w-full max-w-md">
              <h1 className="text-red-700">Provide a projectId to continue</h1>
            </PopoverContent>
          </Popover>
        </div>
      </>
    );
  return (
    <>
      <style>{tailwindStyles}</style>
      <div className="widget fixed bottom-4 right-4 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full shadow-lg hover:scale-105 hover:bg-neutral-700 bg-neutral-900">
              <MessageCircleIcon className="mr-2 h-5 w-5" />
              Feedback
            </Button>
          </PopoverTrigger>
          <PopoverContent className="widget rounded-lg bg-card p-4 shadpw-lg w-full max-w-md">
            <style>{tailwindStyles}</style>
            {submitted ? (
              <div>
                <h3 className="text-lg font-bold">Thank you for your feedback!</h3>
                <p className="mt-4">
                  We appreciate your feedback. It helps us improve our product and provide better service to our customers.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold">Send us your feedback</h3>
                <form className="space-y-2" onSubmit={submit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea id="feedback" placeholder="Tell us what you think" className="min-h-[100px]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`h-5 w-5 cursor-pointer ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                          onClick={() => onSelectStar(index)}
                        />
                      ))}
                    </div>
                    <Button className="bg-neutral-900" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            )}
            <Separator className="my-4" />
            <div className="text-gray-600 flex gap-4">
              Powered by{" "}
              <a href="https://pheedbac.vercel.app/" target="_blank" className="text-neutral-800 underline flex gap-2" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 154.78 154.78" width={20} height={20}>
                  <g data-name="Layer 1">
                    <rect
                      width={154.78}
                      height={154.78}
                      rx={33.47}
                      ry={33.47}
                      style={{
                        fill: "#000",
                        strokeWidth: 0,
                      }}
                    />
                    <path
                      d="m97.83 64.06-2.51 1.83-2.54 1.84c.87 2.07 1.34 4.34 1.34 6.72 0 9.64-7.85 17.49-17.49 17.49H26.68L22.48 95l-4.2 3.06h58.35c13.02 0 23.61-10.59 23.61-23.61 0-3.73-.87-7.25-2.41-10.39Zm-37.01 23.9 2.55-1.85 2.57-1.87c-.88-2.1-1.36-4.4-1.36-6.81 0-9.78 7.96-17.73 17.73-17.73h50.64l4.26-3.1 4.26-3.1H82.31c-13.2 0-23.93 10.73-23.93 23.93 0 3.78.88 7.35 2.45 10.53Z"
                      style={{
                        strokeWidth: 0,
                        fill: "#fff",
                      }}
                    />
                  </g>
                </svg>
                Pheedback
              </a>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-message-circle">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
