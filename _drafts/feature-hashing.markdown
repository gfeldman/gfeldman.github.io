---
layout: post
title:  "Understanding Feature Hashing"
categories: machine learning big data  
permalink: /blog/FeatureHashing
---

The main focus of the feature hashing techniques is to reduce the dimensions of the data through hashing an infinite feature space to a finite feature space. 
The main drawback of feature hashing techniques is the hash collision, and a solution for this problem is needed to improve scaling-up machine learning techniques.


In their paper ["Feature hashing for large scale multitask learning."](http://www.machinelearning.org/archive/icml2009/papers/407.pdf)

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

## Definition of Hash Kernels ##

Denote by \\( h \\) a hash function on \\( h : \mathbb{N} \rightarrow \lbrace 1, \ldots, m \rbrace \\). Moreover, denote by \\(\xi\\) a hash function \\(\xi : \mathbb{N} \rightarrow \lbrace \pm 1 \rbrace\\). Then for vectors \\(\mathbf{x},\mathbf{x}^{\prime} \in \ell_2\\), we define the hashed feature map \\(\phi\\) and the corresponding inner product as 

$$ \phi_{i}^{(h,\xi)}(\mathbf{x}) = \sum\limits_{j:h(j)=i}\xi(j)x_{j} \\
\mbox{ and } \langle \mathbf{x}, \mathbf{x}^{\prime} \rangle_{\phi} = \langle \mathbf{\phi}^{(h,\xi)}(\mathbf{x}),\mathbf{\phi}^{(h,\xi)}(\mathbf{x}^\prime)\rangle  $$