
# **Personalized Children’s Cartoon Character Generator**

This project is an end-to-end prototype for generating **personalized children’s illustrations** from a user-uploaded photo.

It was built for demonstrate real-world skills in AI personalization, full-stack development, and decision-making.

## **What This Project Does**

### One-page Next.js UI

A minimal Next.js (TypeScript) frontend:

* Uploads an image
* Sends it to the backend
* Displays the generated cartoon illustration

### Node.js backend

The backend:

1. Receives the uploaded image
2. Sends it directly to the AI model
3. Returns the stylized illustrated output

### Identity-Preserving AI Model

I use:

`fofr/face-to-many:a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf`

This model automatically:

* Detects the face
* Extracts identity features
* Preserves pose + facial structure
* Stylizes the person into a **3D children’s illustration**

### Style Prompt

I guide the style using:

> **“3D children’s illustration style, Pixar-like soft pastel colors, smooth textures, big expressive eyes, warm lighting, colourful home background, keeping the original person’s pose and identity.”**

### **Architecture Overview**

## **Model Choice**

i selected **fofr/face-to-many** because:

* It performs **automatic face detection + identity preservation**
* Produces high-quality, Pixar-like illustrations
* Requires no ControlNet or complex preprocessing
* Has fast inference and predictable results
* Works well for single-photo personalization pipelines

This aligns perfectly with Pickabook’s requirement to transform a real child’s photo into a stylized illustrated character.

## **Limitations**

1. **No strict template insertion in this version**

   The model generates a stylized illustration but does not place the face into a fixed provided template.
2. **Background generation is prompt-driven**

   It is not tied to a specific template scene.
3. **Stylization slightly softens fine facial details**

   Expected for cartoon models.
4. **Only supports one face per image**

## **Improvements for V2**

* **True template integration** :

  Composite the stylized face into provided templates.
* **Advanced face segmentation** :

  Use Mediapipe or InsightFace for precise blending into templates.
* **Multiple outputs** :

  Generate several illustration variations per upload.

## **How to Run**

### **Frontend**

`npm install`

`npm run dev`

### **Backend**

`npm install `

`npm run dev`

Set your Replicate token:

`REPLICATE_API_TOKEN=your_token_here`

## **Result**

The system converts a user-uploaded photo into a  **personalized 3D children’s illustration** , preserving identity and pose while applying a warm, friendly, storybook-style aesthetic.
