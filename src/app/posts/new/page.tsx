'use client'

import Form from 'next/form'
import { createPost } from "@/app/posts/new/actions";
import { useActionState } from 'react';

export default function Page() {
    const [state, action, pending] = useActionState(createPost, null);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <Form action={action} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-lg mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter your post title"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-lg mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Write your post content here..."
                        rows={6}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                    disabled={pending}
                >
                    Create Post
                </button>
                {pending && <p>Post is being created</p>}
            </Form>
        </div>
    );
}