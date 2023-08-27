import pygame
import random

# Инициализация Pygame
pygame.init()

# Размеры экрана
screen_width = 640
screen_height = 480

# Цвета
black = (0, 0, 0)
white = (255, 255, 255)
blue = (0, 0, 255)
green = (0, 255, 0)

# Создание экрана
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Arkanoid")

# Платформа
platform_width = 100
platform_height = 10
platform_x = (screen_width - platform_width) // 2
platform_y = screen_height - platform_height - 20
platform_speed = 5

# Шарик
ball_radius = 10
ball_x = screen_width // 2
ball_y = screen_height // 2
ball_speed_x = 3
ball_speed_y = -3

# Блоки
block_width = 60
block_height = 20
blocks = []
for row in range(5):
    for col in range(10):
        block = pygame.Rect(col * (block_width + 5), row * (block_height + 5), block_width, block_height)
        blocks.append(block)

# Главный цикл игры
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Управление платформой
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and platform_x > 0:
        platform_x -= platform_speed
    if keys[pygame.K_RIGHT] and platform_x < screen_width - platform_width:
        platform_x += platform_speed

    # Обновление координат шарика
    ball_x += ball_speed_x
    ball_y += ball_speed_y

    # Отскок шарика от стенок
    if ball_x <= 0 or ball_x >= screen_width:
        ball_speed_x = -ball_speed_x
    if ball_y <= 0:
        ball_speed_y = -ball_speed_y

    # Отскок шарика от платформы
    if ball_y >= platform_y - ball_radius and platform_x <= ball_x <= platform_x + platform_width:
        ball_speed_y = -ball_speed_y

    # Проверка столкновения с блоками
    for block in blocks:
        if block.colliderect(pygame.Rect(ball_x - ball_radius, ball_y - ball_radius, 2 * ball_radius, 2 * ball_radius)):
            blocks.remove(block)
            ball_speed_y = -ball_speed_y

    # Отрисовка
    screen.fill(black)
    pygame.draw.rect(screen, green, (platform_x, platform_y, platform_width, platform_height))
    pygame.draw.circle(screen, blue, (ball_x, ball_y), ball_radius)
    for block in blocks:
        pygame.draw.rect(screen, white, block)
    pygame.display.flip()

    # Проверка завершения игры
    if ball_y > screen_height:
        running = False

# Завершение игры
pygame.quit()
