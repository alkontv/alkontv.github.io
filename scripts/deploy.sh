#!/usr/bin/env bash
# Сборка и выкладка портфолио на свой сервер.
#
#   PORTFOLIO_SSH=user@host ./scripts/deploy.sh
#
# Переменные:
#   PORTFOLIO_SSH   — обязательная, куда заливать (user@host)
#   PORTFOLIO_PATH  — каталог на сервере, по умолчанию /srv/alkontv
#   PORTFOLIO_HOST  — домен для адреса портфолио в резюме
set -euo pipefail

: "${PORTFOLIO_SSH:?укажи PORTFOLIO_SSH=user@host}"
REMOTE_PATH="${PORTFOLIO_PATH:-/srv/alkontv}"
SITE_HOST="${PORTFOLIO_HOST:-alkontv.ru}"

echo "==> Проверки перед сборкой"
npm test --silent
npm run lint

echo "==> Сборка статики для https://$SITE_HOST"
NEXT_PUBLIC_SITE_URL="https://$SITE_HOST" npm run build

test -f out/index.html || { echo "out/index.html не собрался"; exit 1; }
test -f out/cases.html || { echo "out/cases.html не собрался"; exit 1; }

echo "==> Заливка в $PORTFOLIO_SSH:$REMOTE_PATH"
# --delete убирает с сервера файлы, которых больше нет в сборке:
# иначе старые страницы остаются доступными по прямым ссылкам.
rsync -az --delete --checksum out/ "$PORTFOLIO_SSH:$REMOTE_PATH/"

echo "==> Проверка после выкладки"
for path in / /cases /resume; do
	code=$(curl -s -o /dev/null -m 15 -w '%{http_code}' "https://$SITE_HOST$path" || echo 000)
	printf '  %-10s %s\n' "$path" "$code"
	[ "$code" = "200" ] || { echo "  ^ ожидался 200"; exit 1; }
done

echo "==> Готово: https://$SITE_HOST"
