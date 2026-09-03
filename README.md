# Link Kardex — BenyWeb

## English

### What this is
Link Kardex (کاردکس لینک‌ها) is a personal bookmark archive you open as a
single web page. There is no server, no account, and no backend — everything
runs in your browser. It lets you save links with a title, description,
category, and tags, then search, filter by category, sort, and pin your
favorites.

### Files
| File | Purpose |
|---|---|
| `index.html` | Page structure (header, toolbar, bookmark list, form, footer) |
| `style.css` | All styling, including the Light/Dark theme system |
| `script.js` | All app logic: rendering, storage, search/sort/filter, import/export, theme toggle |

To use it, just open `index.html` in a browser (double-click it, or serve the
folder with any static file server). No build step or installation is
required.

### Where your data is stored
Everything is stored **locally in your own browser**, using the standard
`localStorage` API — nothing is sent anywhere or uploaded to any server.

- **Bookmarks** are stored under the key:
  `benyweb-link-kardex:bookmarks:v1`
- **Theme choice** (Light/Dark) is stored under the key:
  `benyweb-link-kardex:theme`

Because `localStorage` is tied to a specific browser profile:
- Your bookmarks stay saved across refreshes and browser restarts.
- They are **not** synced between different browsers or devices — e.g.
  bookmarks saved in Chrome won't automatically appear in Firefox, or on
  your phone.
- Clearing your browser's site data/cookies for this page will erase your
  bookmarks. Use the **"خروجی JSON" (Export JSON)** button regularly if you
  want a backup file.

The app never wipes your saved data automatically — it only removes a
bookmark from storage when you explicitly delete it.

### How to add your own bookmarks
1. Open the page and click **"لینک جدید" (New Link)** in the toolbar.
2. Fill in the form:
   - **URL** (required) — paste the link; `https://` is added automatically
     if you leave it off.
   - **Title** (required) — the name shown in your list.
   - **Category** (optional) — type a new one or pick an existing one from
     the suggestions.
   - **Description** (optional) — a short note about the link.
   - **Tags** (optional) — comma-separated, e.g. `python, learning`.
3. Click **"ذخیره" (Save)**. The bookmark appears instantly and is saved to
   `localStorage` right away — no extra step needed.
4. To edit or delete, use the pencil/trash icons on each row. To pin a
   bookmark to the top, click the star icon.

### Bulk-adding bookmarks
- **From your browser's bookmarks:** In your browser, export your bookmarks
  as an HTML file (usually Bookmarks Manager → Export bookmarks). Then in
  Link Kardex click **"درون‌ریزی از بوکمارک مرورگر" (Import from browser
  bookmarks)** and select that file. Duplicate URLs are skipped
  automatically.
- **From a JSON file:** Click **"درون‌ریزی JSON" (Import JSON)** and select
  a `.json` file containing an array of bookmark objects (`url`, `title`,
  `description`, `category`, `tags`). You can generate this file yourself
  by first using **"خروجی JSON" (Export JSON)** on another instance of the
  page, then importing it here.

---

## فارسی

### این پروژه چیست
کاردکس لینک‌ها یک بایگانی شخصی از لینک‌هاست که به‌صورت یک صفحهٔ وب مستقل اجرا
می‌شود. هیچ سروری، حساب کاربری یا بک‌اندی در کار نیست — همه‌چیز داخل مرورگر
خودتان اجرا می‌شود. می‌توانید برای هر لینک عنوان، توضیح، دسته‌بندی و برچسب
ثبت کنید و بعد بین آن‌ها جستجو، فیلتر بر اساس دسته، مرتب‌سازی و پین کردن
انجام دهید.

### فایل‌ها
| فایل | نقش |
|---|---|
| `index.html` | ساختار صفحه (هدر، نوار ابزار، فهرست لینک‌ها، فرم، فوتر) |
| `style.css` | تمام استایل‌ها، از جمله سیستم پوستهٔ روشن/تاریک |
| `script.js` | تمام منطق برنامه: رندر، ذخیره‌سازی، جستجو/مرتب‌سازی/فیلتر، درون‌ریزی و خروجی، تغییر پوسته |

برای استفاده کافی است فایل `index.html` را در مرورگر باز کنید (دابل‌کلیک
روی آن، یا اجرای پوشه با هر سرور فایل استاتیک). نیازی به نصب یا Build کردن
چیزی نیست.

### اطلاعات شما کجا ذخیره می‌شود
همه‌چیز به‌صورت **محلی، درون همان مرورگر شما** با استفاده از قابلیت استاندارد
`localStorage` ذخیره می‌شود — هیچ داده‌ای به هیچ سروری ارسال یا آپلود
نمی‌شود.

- **بوکمارک‌ها** با این کلید ذخیره می‌شوند:
  `benyweb-link-kardex:bookmarks:v1`
- **انتخاب پوسته** (روشن/تاریک) با این کلید ذخیره می‌شود:
  `benyweb-link-kardex:theme`

چون `localStorage` به یک مرورگر مشخص روی یک دستگاه مشخص وابسته است:
- بوکمارک‌های شما بعد از Refresh یا بستن و باز کردن دوبارهٔ مرورگر باقی
  می‌مانند.
- بین مرورگرها یا دستگاه‌های مختلف Sync نمی‌شوند — مثلاً بوکمارکی که در
  Chrome ذخیره کرده‌اید، به‌طور خودکار در Firefox یا روی گوشی‌تان دیده
  نمی‌شود.
- اگر داده‌های سایت را از مرورگر پاک کنید، بوکمارک‌ها هم پاک می‌شوند. برای
  داشتن نسخهٔ پشتیبان، هر از گاهی از دکمهٔ **«خروجی JSON»** استفاده کنید.

برنامه هرگز به‌طور خودکار داده‌های ذخیره‌شده را پاک نمی‌کند؛ فقط زمانی یک
بوکمارک از حافظه حذف می‌شود که خودتان صراحتاً آن را حذف کنید.

### چطور بوکمارک خودتان را اضافه کنید
1. صفحه را باز کنید و روی دکمهٔ **«لینک جدید»** در نوار ابزار کلیک کنید.
2. فرم را پر کنید:
   - **آدرس (URL)** (اجباری) — لینک را وارد کنید؛ اگر `https://` را ننویسید
     خودکار اضافه می‌شود.
   - **عنوان** (اجباری) — نامی که در فهرست نمایش داده می‌شود.
   - **دسته‌بندی** (اختیاری) — یک دستهٔ جدید تایپ کنید یا از پیشنهادهای
     موجود انتخاب کنید.
   - **توضیح** (اختیاری) — چند کلمه دربارهٔ لینک.
   - **برچسب‌ها** (اختیاری) — با کاما جدا کنید، مثلاً `پایتون, یادگیری`.
3. روی **«ذخیره»** کلیک کنید. بوکمارک بلافاصله در فهرست ظاهر می‌شود و همان
   لحظه در `localStorage` ذخیره می‌شود — نیازی به هیچ کار اضافه‌ای نیست.
4. برای ویرایش یا حذف، از آیکون‌های مداد/سطل زبالهٔ کنار هر ردیف استفاده
   کنید. برای پین کردن یک بوکمارک در بالای فهرست، روی آیکون ستاره کلیک
   کنید.

### افزودن گروهی بوکمارک‌ها
- **از بوکمارک‌های مرورگر:** در مرورگرتان، بوکمارک‌ها را به‌صورت فایل HTML
  خروجی بگیرید (معمولاً از مسیر مدیریت بوکمارک‌ها ← Export bookmarks). سپس
  در کاردکس لینک‌ها روی **«درون‌ریزی از بوکمارک مرورگر»** کلیک کنید و آن
  فایل را انتخاب کنید. لینک‌های تکراری به‌طور خودکار نادیده گرفته می‌شوند.
- **از فایل JSON:** روی **«درون‌ریزی JSON»** کلیک کنید و یک فایل `.json`
  حاوی آرایه‌ای از آبجکت‌های بوکمارک (`url`، `title`، `description`،
  `category`، `tags`) انتخاب کنید. می‌توانید ابتدا با دکمهٔ **«خروجی
  JSON»** روی یک نسخهٔ دیگر از صفحه، چنین فایلی بسازید و بعد همین‌جا
  درون‌ریزی کنید.
