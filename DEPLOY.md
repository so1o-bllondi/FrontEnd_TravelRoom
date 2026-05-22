# 🚀 Деплой на GitHub Pages

## ✅ Проект настроен для GitHub Pages!

**Важно:** Проект использует HashRouter вместо BrowserRouter для корректной работы на GitHub Pages.  
Это означает, что URL будут выглядеть так: `https://username.github.io/repo/#/`

## Быстрый старт

### 1. Настройте vite.config.js

Откройте `vite.config.js` и измените название репозитория в строке:

```js
base: process.env.GITHUB_ACTIONS ? '/TravelRoom/' : '/',
```

Замените `/TravelRoom/` на название вашего репозитория:
- Если репозиторий называется `my-project`, используйте `/my-project/`
- Если используете custom domain или `username.github.io`, используйте `/`

### 2. Включите GitHub Pages в настройках репозитория

1. Зайдите в **Settings** вашего репозитория
2. Перейдите в раздел **Pages** (левое меню)
3. В разделе **Source** выберите **GitHub Actions**
4. Сохраните настройки

### 3. Запушьте код в main ветку

```bash
git add .
git commit -m "Setup GitHub Pages"
git push origin main
```

### 4. Дождитесь деплоя

- Перейдите во вкладку **Actions** в вашем репозитории
- Вы увидите запущенный workflow "Deploy to GitHub Pages"
- Дождитесь завершения (обычно 1-2 минуты)
- После успешного деплоя сайт будет доступен по адресу:
  
  `https://ваш-username.github.io/название-репозитория/`

---

## Автоматический деплой

После первоначальной настройки:
- Каждый push в ветку `main` автоматически запускает деплой
- Можно также запустить деплой вручную через вкладку **Actions** → выбрать workflow → **Run workflow**

---

## Структура файлов деплоя

```
.github/
  workflows/
    deploy.yml       # GitHub Actions workflow для автодеплоя

vite.config.js       # Настройка base path для GitHub Pages
```

---

## Troubleshooting

### Проблема: Белый экран на GitHub Pages ✅ ИСПРАВЛЕНО

**Решение:** Проект уже использует `HashRouter` вместо `BrowserRouter` для корректной работы на GitHub Pages.

### Проблема: Сайт открывается, но стили не работают

**Решение:** Проверьте, что в `vite.config.js` указано правильное название репозитория в `base`

### Проблема: Workflow завершается с ошибкой

**Решение:** 
1. Проверьте, что в Settings → Pages выбрано **GitHub Actions** как Source
2. Проверьте логи во вкладке Actions
3. Убедитесь, что `npm ci` и `npm run build` работают локально

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
  <body></body>
</html>
```

И в `index.html` перед `</head>`:

```html
<script>
  (function(){
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

---

## Custom Domain (опционально)

Если хотите использовать свой домен:

1. Создайте файл `public/CNAME` с вашим доменом:
   ```
   yourdomain.com
   ```

2. В `vite.config.js` измените base на `/`:
   ```js
   base: '/',
   ```

3. Настройте DNS записи у вашего провайдера:
   - Для корневого домена: A записи на IP GitHub
   - Для поддомена: CNAME запись на `username.github.io`

---

## Полезные ссылки

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

Готово! 🎉 Ваш проект теперь автоматически деплоится на GitHub Pages.
