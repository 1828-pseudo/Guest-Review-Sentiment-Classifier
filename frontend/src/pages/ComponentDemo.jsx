import { useState } from "react";
import toast from "react-hot-toast";

import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "../components/ui";

function ComponentDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8 space-y-8">

      <Toast />

      <h1 className="text-3xl font-bold">
        UI Component Showcase
      </h1>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>

      <Input
        label="Guest Name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Button
        variant="secondary"
        onClick={() => toast.success("Toast Working!")}
      >
        Show Toast
      </Button>

      <Loader />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Demo Modal"
      >
        <p>This is a modal component.</p>
      </Modal>
    </div>
  );
}

export default ComponentDemo;