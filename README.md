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

### How it works
1. **On load**, the page reads your saved bookmarks from `localStorage`
   (falling back to a couple of legacy key names for older versions of this
   page, so nothing gets lost after an update) and renders them as a list.
2. **Adding/editing** a bookmark opens an inline form; on save, the app
   normalizes the entry (adds `https://` if missing, generates an id,
   timestamps it) and writes the full list straight back to `localStorage` —
   there is no separate "save" step to remember.
3. **Filtering, searching, and sorting** all happen live in the browser: the
   category list on the side is rebuilt from your current bookmarks, the
   search box matches title/description/URL/category/tags, and the sort
   dropdown reorders by newest, oldest, or title (A–Z).
4. **Pinning** a bookmark just sets a flag on that entry so it's grouped at
   the top of the list, above the rest.
5. **Import** reads either a browser-exported bookmarks HTML file (Netscape
   format) or a `.json` file you exported earlier, and merges new links in
   while skipping any URL you already have saved.
6. **Theme** (light/dark) is stored separately from your bookmarks, so
   toggling it never touches your saved links.

Because everything lives in `localStorage`, there is nothing to configure,
deploy, or keep running — the "backend" is just your browser's storage for
that page.

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

### Different ways to use it
- **As a single local archive:** just open `index.html` from your computer
  whenever you want to look something up — no install, no server, works
  offline.
- **As a per-device archive:** keep a copy of the folder on each computer
  you use; since bookmarks are per-browser, each copy will build up its own
  list unless you move data between them (see below).
- **Moving your links between browsers/devices:** click **Export JSON** on
  the source, copy the `.json` file over (USB drive, cloud folder, email to
  yourself, etc.), then open the page on the target browser/device and
  click **Import JSON**. Duplicate URLs are skipped automatically, so it's
  safe to import the same export more than once.
- **Migrating from your browser's native bookmarks:** export your browser's
  bookmarks as HTML once, then use **Import from browser bookmarks** here
  to bring them all in with categories inferred from your bookmark folders.
- **As a lightweight backup of your links:** periodically click
  **Export JSON** and keep the file somewhere safe (cloud drive, backup
  disk) — since there's no server, this file *is* your backup.
- **Hosting it for yourself online:** if you'd rather have one shared
  version instead of a per-browser copy, you can upload these three files
  to any static web host (GitHub Pages, Netlify, a simple web server,
  etc.) and open that URL from any device — but note each browser visiting
  it will still keep its **own** separate `localStorage`, so this only
  gives you a shared *page*, not automatically shared *data*.

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

### نحوه‌ی کار برنامه
۱. **هنگام باز شدن صفحه**، بوکمارک‌های ذخیره‌شده از `localStorage` خوانده
   می‌شوند (اگر کلید اصلی خالی باشد، چند نام کلید قدیمی هم بررسی می‌شود تا
   داده‌ی نسخه‌های قبلی این صفحه از دست نرود) و به‌صورت فهرست نمایش داده
   می‌شوند.
۲. **افزودن/ویرایش** یک بوکمارک یک فرم داخل صفحه باز می‌کند؛ با کلیک روی
   ذخیره، برنامه ورودی را استاندارد می‌کند (اگر `https://` نداشت اضافه
   می‌شود، یک شناسه‌ی یکتا و زمان ثبت می‌سازد) و کل فهرست را همان لحظه در
   `localStorage` می‌نویسد — نیازی به مرحله‌ی جداگانه‌ی «ذخیره» نیست.
۳. **فیلتر، جستجو و مرتب‌سازی** همه به‌صورت زنده داخل مرورگر انجام می‌شوند:
   فهرست دسته‌ها از روی بوکمارک‌های فعلی ساخته می‌شود، کادر جستجو در
   عنوان/توضیح/آدرس/دسته/برچسب‌ها می‌گردد، و منوی مرتب‌سازی بر اساس جدیدترین،
   قدیمی‌ترین یا عنوان (الفبایی) ترتیب می‌دهد.
۴. **پین کردن** یک بوکمارک فقط یک فلگ روی همان آیتم تنظیم می‌کند تا در
   بالای فهرست، جدا از بقیه، گروه‌بندی شود.
۵. **درون‌ریزی (Import)** یا یک فایل HTML خروجی‌گرفته‌شده از بوکمارک‌های
   مرورگر (فرمت Netscape) را می‌خواند، یا یک فایل `.json` که قبلاً خودتان
   خروجی گرفته‌اید، و لینک‌های جدید را اضافه می‌کند و آدرس‌های تکراری را
   نادیده می‌گیرد.
۶. **پوسته (تم روشن/تاریک)** جدا از بوکمارک‌ها ذخیره می‌شود، پس تغییر آن
   هیچ تاثیری روی لینک‌های ذخیره‌شده‌ی شما ندارد.

چون همه‌چیز در `localStorage` مرورگر ذخیره می‌شود، هیچ تنظیمی، دیپلوی یا
سرویسی برای روشن نگه‌داشتن لازم نیست — «بک‌اند» فقط همان حافظه‌ی مرورگر
شماست برای همین صفحه.

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

### روش‌های مختلف استفاده از این ابزار
- **به‌عنوان یک بایگانی محلی ساده:** هر وقت خواستید لینکی را پیدا کنید،
  کافی است `index.html` را از روی سیستم خودتان باز کنید — بدون نصب، بدون
  سرور، حتی بدون اینترنت هم کار می‌کند.
- **به‌عنوان یک بایگانی جداگانه روی هر دستگاه:** یک کپی از این پوشه را روی
  هر سیستمی که استفاده می‌کنید نگه دارید؛ چون بوکمارک‌ها به هر مرورگر
  وابسته‌اند، هر کپی فهرست خودش را می‌سازد مگر این‌که داده را بین آن‌ها
  جابه‌جا کنید (به بخش بعد نگاه کنید).
- **جابه‌جا کردن لینک‌ها بین مرورگرها/دستگاه‌ها:** روی سیستم مبدأ **خروجی
  JSON** بگیرید، فایل `.json` را جابه‌جا کنید (فلش، فولدر ابری، ایمیل به
  خودتان و ...)، سپس در مرورگر/دستگاه مقصد همان صفحه را باز کنید و
  **درون‌ریزی JSON** بزنید. آدرس‌های تکراری خودکار نادیده گرفته می‌شوند، پس
  وارد کردن دوبارهٔ همان فایل هم مشکلی ایجاد نمی‌کند.
- **مهاجرت از بوکمارک‌های خود مرورگر:** یک‌بار بوکمارک‌های مرورگرتان را
  به‌صورت HTML خروجی بگیرید، بعد با **درون‌ریزی از بوکمارک مرورگر** همه را
  همراه با دسته‌بندی‌ای که از پوشه‌های بوکمارک استخراج می‌شود وارد کنید.
- **به‌عنوان یک نسخهٔ پشتیبان سبک از لینک‌ها:** هر از گاهی **خروجی JSON**
  بگیرید و فایل را جایی امن (فضای ابری، هارد پشتیبان) نگه دارید — چون
  سروری در کار نیست، همین فایل عملاً نسخهٔ پشتیبان شماست.
- **میزبانی آنلاین برای خودتان:** اگر ترجیح می‌دهید به‌جای کپی‌های جداگانه
  روی هر مرورگر، یک نسخهٔ مشترک داشته باشید، می‌توانید این سه فایل را روی
  هر میزبان استاتیک (GitHub Pages، Netlify، یک وب‌سرور ساده و ...) آپلود
  کنید و همان آدرس را از هر دستگاهی باز کنید — اما توجه کنید هر مرورگری که
  آن صفحه را باز کند باز هم `localStorage` **جداگانهٔ خودش** را نگه می‌دارد،
  پس این کار فقط یک «صفحه»ی مشترک می‌دهد، نه لزوماً «داده»ی خودکار مشترک.
