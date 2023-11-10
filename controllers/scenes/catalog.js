const {bot} = require('../../bot')
const session = require('telegraf/session')
const { Stage, Markup, Extra } = require('telegraf');
const Scene = require('telegraf/scenes/base')
const { Keyboard,Key  } = require('telegram-keyboard')



const products = [
    {
      name: '*ВКН 65*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* Алюминиевый\n*Серия профиля:* Тёплая\n*Монтажная глубина:* 148 мм (две рельсы) 232 мм (три рельсы)\n*Мин/Макс толщина стеклопакета:* 18-50 мм\n*Толщина стенки профиля:* 1,4 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2F%D0%92%D0%9A%D0%9D%2065.png?alt=media&token=7a2f55cc-eb37-49c3-9506-91b452d58a93',
    },
    {
      name: '*CHAMPION*',
      description: '*Технические характеристики*\n\n *Тип профиля:* Алюминиевый\n *Серия профиля:* Холодная\n *Монтажная глубина:* 47 мм\n *Мин/Макс толщина стеклопакета:* 20 мм\n *Толщина стенки профиля:* 1,1 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FChampion.png?alt=media&token=8170b40a-9f90-4e65-97dc-683c1f68b052',
    },
    {
      name:'*TERMO 78*\n',
      description:'*Технические характеристики*\n\n *Тип профиля:* Алюминиевый\n *Серия профиля:* Тёплая\n  *Монтажная глубина:* 78 мм\n *Мин/Макс толщина стеклопакета:* 20-32 мм\n *Толщина стенки профиля:* 1,4 мм',
      imageUrl:'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FTERMO%2078.png?alt=media&token=ba95d451-73dd-458a-abb4-db0583488d1e'
    },
    {
      name: '*TERMO 65*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* Алюминиевый\n*Серия профиля:* Тёплая\n*Монтажная глубина:*  64 мм\n*Мин/Макс толщина стеклопакета:* 20-30 мм\n*Толщина стенки профиля:* 1,4 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FTERMO%2065.png?alt=media&token=5bbde2b1-9fc6-4341-b1af-077811b81441',
    },
    {
      name: '*TERMO 98*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* Алюминиевый\n*Серия профиля:* Тёплая\n*Монтажная глубина:*  90 мм\n*Мин/Макс толщина стеклопакета:* 28-66 мм\n*Толщина(Глубина) стенки профиля:* 1,4 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FTERMO%2098.png?alt=media&token=13b80582-9088-4f99-a118-9cbea50703cd',
    },
    {
      name: '*TRIO 6000*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* ПВХ\n*Серия профиля:* Тёплая\n *Количество камер:* 3\n *Монтажная глубина:*  60 мм\n *Толщина армирующего профиля:* 1,2 мм\n *Мин/Макс толщина стеклопакета:* 28-66 мм\n*Толщина стенки профиля:* 2,8 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FTRIO%206000.png?alt=media&token=fa7bd174-758d-44a2-b04c-acf4d58ae25e',
    },
    {
      name: '*QUATTRO 6000*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* ПВХ\n *Количество камер:* 4\n *Монтажная глубина:*  60 мм\n *Толщина армирующего профиля:* 1,2 мм\n *Мин/Макс толщина стеклопакета:* 20 мм\n*Толщина стенки профиля:* 2,2 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FQUATTRO%206000.png?alt=media&token=8747c897-9c36-47ae-9d31-37edda8a8277',
    },
    {
      name: '*ENGELBERG 8000*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* ПВХ\n *Количество камер:* 6\n *Монтажная глубина:*  80 мм\n *Толщина армирующего профиля:* 2 мм\n *Мин/Макс толщина стеклопакета:* 24-32 мм\n*Толщина стенки профиля:* 2,8 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FENGELBERG%208000.png?alt=media&token=f8f177a6-3930-4198-926d-095be05da90c',
    },
    {
      name: '*ENGELBERG 7000*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* ПВХ\n *Количество камер:* 5\n *Монтажная глубина:*  70 мм\n *Толщина армирующего профиля:* 2 мм\n *Мин/Макс толщина стеклопакета:* 24-30 мм\n*Толщина стенки профиля:* 2,8 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FENGELBERG%207000.png?alt=media&token=35f781c5-0e9b-4e27-bbab-709a49814abe',
    },
    {
      name: '*BKF 50*\n',
      description: '*Технические характеристики*\n\n *Ширина стоек и ригелей:* 50 мм\n *Минимальная толщина заполнения:* 4 мм\n *Максимальная толщина заполнения:* 62 мм\n *Максимальный вес заполнения:* 500-700 кг\n *Сейсмостойкость:* 9 баллов',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FBKF%2050.png?alt=media&token=8feb3eec-4d47-4686-9f00-3fcb578d8bbb',
    },
    {
      name: '*TIARA TWINMAX*\n',
      description: '*Технические характеристики*\n\n *Мин.макс размеры:* 6000 x 2800 мм\n *Ролики из нержавеющей стали:* 38 мм\n *Водораспределительный профиль:* 61x52 мм\n *Стеклопакет:* 28 мм\n *Профиль панели:* 47х35 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FTIARA%20TWINMAX.png?alt=media&token=72586734-f7fe-48a0-9f54-4b86cd37fda6',
    },
    {
      name: '*SLIDEMASTER*\n',
      description: '*Технические характеристики*\n\n *Несущая система:* 4х4 каретки\n *Несущие ролики:* 100% нержавеющая сталь\n *Минимальная ширина створки:* 450 мм\n *Максимальная ширина створки:* 1500 мм\n *Максимальная высота:* 3000 мм\n *Вес:* 150 кг',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FSLIDEMASTER.png?alt=media&token=19f048fc-42cc-4147-9b68-dd1022a3198e',
    },
    {
      name: '*СЕКЦИОННЫЕ ВОРОТА*\n',
      description: '*Технические характеристики*\n\n *Мощность:* 236 Вт\n *Максимальный вес ворот:* 120 кг\n *Площадь ворот:* 16 м²\n *Напряжение двигателя:* 24 В\n *Скорость открывания:* 190 мм/с\n *Тип концевого выключателя:* Энкодер + механический стопор',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2F%D0%A1%D0%95%D0%9A%D0%A6%D0%98%D0%9E%D0%9D%D0%9D%D0%AB%D0%95%20%D0%92%D0%9E%D0%A0%D0%9E%D0%A2%D0%90.png?alt=media&token=2c2c8905-8a78-4d00-9767-389b1420624a',
    },
    {
      name: '*MDF 40*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* МДФ с алюминиевым каркасом\n *Максимальная ширина:* 2600\n *Максимальная высота:* 1100\n *Замок:* Kale\n *Возможность:* вставки из стекла',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FMDF%2040.png?alt=media&token=2e51c434-81c6-4474-a4b9-dd2fc1762083',
    },
    {
      name: '*BKO 40*\n',
      description: '*Технические характеристики*\n\n *Ширина профиля стойки и ригеля:* 40 мм\n *Монтажная глубина стоек и ригелей:* 70 мм\n *Тип фиксации заполенния:* С помощью прижимных профилей *Поддерживаемые толщины заполнения:* 4 / 6 / 8 / 10 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FBKO%2040.png?alt=media&token=5e375379-ae46-4780-be21-7eeb8804d88f',
    },
    {
      name: '*BKGF 90*\n',
      description: '*Технические характеристики*\n\n *Ширина несущего профиля:* 91,5 мм\n *Высота несущего профиля:* 120 мм\n *Ширина видимой части основания:* 135 мм\n *Максимальная толщина заполнения:* 16,8 мм ( стекло триплекс )\n *Максимальная высота стеклянного ограждения:* 1 200 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2FBKGF%2090.png?alt=media&token=f35361a8-941e-4c1a-a14f-6b07d3c9a5a2',
    },
    {
      name: '*РОЛЬСТАВНИ*\n',
      description: '*Технические характеристики*\n\n *Ширина:* 55 / 77 мм\n *Максимальная ширина:* 5000 мм\n *Максимальная высота:* 5000 мм\n *Тип фиксации заполенения:* С помощью прижимных профилей\n *Грузоподъемность:* 30-330 кг\n *Срок эксплуатации:* До 80 лет',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2F%D0%A0%D0%9E%D0%9B%D0%AC%D0%A1%D0%A2%D0%90%D0%92%D0%9D%D0%98.png?alt=media&token=314ba079-89c2-4755-9920-3952891cb6fe',
    },
    {
      name: '*ВКН 65*\n',
      description: '*Технические характеристики*\n\n *Тип профиля:* Алюминиевый\n*Серия профиля:* Тёплая\n*Монтажная глубина:* 148 мм (две рельсы) 232 мм (три рельсы)\n*Мин/Макс толщина стеклопакета:* 18-50 мм\n*Толщина стенки профиля:* 1,4 мм',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/img%2F%D0%92%D0%9A%D0%9D%2065.png?alt=media&token=7a2f55cc-eb37-49c3-9506-91b452d58a93',
    }

  ];
  
  let currentIndex = 0;








// Trigger scene when hears 'catalog'
bot.hears('💎 Каталог', (ctx) => {
    sendProduct(ctx);
});




  bot.action('next', (ctx) => {
    currentIndex = (currentIndex + 1) % products.length;
    sendProduct(ctx);
  });
  
  bot.action('prev', (ctx) => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    sendProduct(ctx);
  });


 async function sendProduct(ctx) {
    if (currentIndex === products.length - 1) {
      await ctx.answerCbQuery('Вы уже на последней странице!', true);
      return; 
    }

    const product = products[currentIndex];
    const message = `${product.name}\n${product.description}`;
    const extra = Extra.markdown().markup((m) =>
      m.inlineKeyboard([
        [m.urlButton('✍️ Подробно', 'https://t.me/FiruzKarimov')],
        [
          m.callbackButton('Следующий ➡️', 'next')
      ],
      ])
    );
  
    ctx.replyWithDocument(product.imageUrl, extra.caption(message));
  }

