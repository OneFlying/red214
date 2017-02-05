发送ajax说明：
1.由于PC网页端与Mobile调用相同的接口，故有以下约定：
  1) 移动端ajax需要添加两个参数， lang 和 isMobile
  2) isMobile值不能为空，可以为任意值，包含假值
  3) lang可通过getLanguage(getters)获得
