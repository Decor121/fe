function Story() {
  const chapters = [
    {
      id: '01',
      title: 'Khởi Nguồn Từ Làng Nghề Cổ Kính',
      subtitle: 'The Roots',
      desc: 'Câu chuyện Home Decor bắt đầu từ lòng nhiệt huyết bảo tồn di sản thủ công Việt Nam. Chúng tôi bắt đầu hành trình tại các làng nghề sơn mài cổ truyền phía Bắc, nơi những bí quyết pha trộn nhựa cây sơn, tán lá vàng lá bạc đã được lưu truyền qua hàng thế kỷ.',
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a814c97?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '02',
      title: 'Kỹ Thuật 15 Lớp Sơn Mài Kỳ Công',
      subtitle: 'The Craftsmanship',
      desc: 'Mỗi tác phẩm Home Decor trải qua ít nhất 15 lớp sơn mài tỉ mỉ, xen kẽ giữa các công đoạn sơn, ủ ẩm và mài dưới nước. Sự hoàn hảo không nằm ở máy móc, mà ở sự nhạy cảm của đôi bàn tay nghệ nhân khi cảm nhận độ mịn, độ sâu của từng mảng màu cẩn vỏ trứng, xà cừ.',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '03',
      title: 'Cú Bắt Tay Giao Thoa Việt - Pháp',
      subtitle: 'The Fusion',
      desc: 'Home Decor tự hào hợp tác cùng các nhà thiết kế thời trang và nội thất danh tiếng từ Pháp và Châu Âu. Sự kết hợp giữa tinh thần đương đại phương Tây và bàn tay khéo léo của nghệ nhân Việt tạo ra những bộ sưu tập trang trí độc đáo, mang vẻ đẹp vượt thời gian.',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white min-h-screen text-neutral-800 font-sans border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heritage Header */}
        <div className="text-center max-w-3xl mx-auto mb-28 space-y-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Di sản sơn mài Việt Nam
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 leading-tight">
            Câu Chuyện <span className="font-semibold italic text-[#b08263]">Home Decor</span>
          </h1>
          <p className="text-neutral-500 leading-relaxed font-light text-base md:text-lg">
            Nơi hội tụ của nghệ thuật sơn mài cổ truyền ngàn năm tuổi và tư duy thẩm mỹ cao cấp đương đại.
          </p>
        </div>

        {/* Chapters Timeline/Staggered */}
        <div className="space-y-24 md:space-y-36">
          {chapters.map((chap, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={chap.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center`}
              >
                {/* Image Block */}
                <div
                  className={`lg:col-span-6 relative group overflow-hidden rounded-2xl border border-neutral-200 p-2 bg-neutral-50/50 shadow-sm ${isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                >
                  <img
                    src={chap.image}
                    alt={chap.title}
                    className="w-full h-[350px] md:h-[420px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content Block */}
                <div
                  className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-5xl md:text-6xl font-extrabold text-[#b08263]/20 leading-none">
                      {chap.id}
                    </span>
                    <span className="text-xs uppercase tracking-widest font-semibold text-brand-600">
                      {chap.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-neutral-900 font-medium tracking-wide">
                    {chap.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-neutral-500 leading-relaxed font-light">
                    {chap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Heritage Quote Banner */}
        <div className="mt-32 border-t border-b border-neutral-200 py-16 text-center max-w-4xl mx-auto space-y-6">
          <svg className="w-10 h-10 text-[#b08263] mx-auto opacity-40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.914-3.996 3.638-3.996 5.846h3.999v10h-9.999z" />
          </svg>
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-neutral-800 italic leading-relaxed">
            "Sơn mài không chỉ là một chất liệu mỹ thuật, sơn mài là linh hồn nghệ thuật Việt Nam được kết tinh từ sự kiên nhẫn, đam mê và thời gian."
          </blockquote>
          <cite className="block text-xs uppercase tracking-widest text-[#b08263] font-semibold not-italic">
            — Home Decor Nghệ Nhân Tập Thể
          </cite>
        </div>

      </div>
    </section>
  );
}

export default Story;
