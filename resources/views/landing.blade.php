<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRM Gadget</title>

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('css/landing.css') }}">
</head>

<body>

<!-- NAVBAR -->
<header class="navbar">
  <div class="nav">
    <div class="logo">Prototype</div>
    <div class="menu">
      <a href="#">Sign in</a>
      <a href="#" class="btn">Sign up free</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  </div>
</header>

<!-- HERO -->
<section class="hero">

  <div class="circle big"></div>
  <div class="circle mid"></div>
  <div class="circle small"></div>

  <div class="left">
    <h1>500+</h1>
    <p>Brands</p>
  </div>

  <div class="right">
    <h1>1000+</h1>
    <p>Buyers</p>
    <span>Affordable prices</span>
  </div>

  <div class="phone">
    <img src="{{ asset('img/tanganHP.png') }}" alt="Phone">
  </div>

</section>

<!-- PARTNER -->
<section class="partner">
  <h2>Our Partner</h2>
  <div class="logos">
    <span>SAMSUNG</span>
    <span class="highlight">Lenovo</span>
    <span>Mi</span>
    <span>TECNO</span>
  </div>
</section>

<!-- ABOUT -->
<section class="about">
  <h2>Definisi Baru Kecepatan, Gaya, dan Inovasi dalam Satu Genggaman.</h2>

  <div class="about-content">
    <img src="{{ asset('img/tanganHP.png') }}" alt="">
    <p>
      Di dunia yang bergerak cepat, Anda membutuhkan perangkat yang tidak hanya berfungsi,
      tapi juga mampu mengimbangi ambisi Anda.
    </p>
  </div>
</section>

<!-- FEATURES -->
<section class="features">
  <div class="card">⚙️<p>Performa tinggi</p></div>
  <div class="card">📱<p>Gaya modern</p></div>
  <div class="card">❤️<p>Kualitas terbaik</p></div>
</section>

<!-- CTA -->
<section class="cta">
  <h2>Jangan Tunggu Sampai Stok Habis!</h2>
  <p>Dapatkan penawaran eksklusif sekarang</p>
  <button>Order Now</button>
</section>

<!-- REVIEW -->
<section class="review">
  <h2>Our customer reviews</h2>
  <div class="review-cards">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="footer-grid">
    <div>
      <h4>Tentang Kami</h4>
      <p>Profil Perusahaan</p>
    </div>
    <div>
      <h4>Pelayanan</h4>
      <p>Knowledge Produk</p>
    </div>
    <div>
      <h4>Alamat Kita</h4>
      <p>Cabang Kota</p>
    </div>
  </div>
</footer>

</body>
</html>