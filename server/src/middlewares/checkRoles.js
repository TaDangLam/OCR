export const checkRoles = (allowAdmin = true, allowUser = false) => {
  return (resolver) => {
    return (parent, args, context, info) => {
      const user = context.user;
      
        // Chưa đăng nhập
        if (!user) {
            throw new Error("Authentication required");
        }
         // Admin luôn được quyền
        if (user.isAdmin && allowAdmin) {
        return resolver(parent, args, context, info);
      }
        
      // User thường chỉ được phép nếu allowUser = true
      if (!user.isAdmin && allowUser) {
        // Chỉ áp dụng với object có id (User, update, delete)
        if(args.id) {
          // Nếu args.id tồn tại và trùng với user.id => cho phép
          if (args.id && args.id === user.id) {
            return resolver(parent, args, context, info);
          }
          throw new Error("Permission denied user ID!");
        }
        // Nếu không có args.id → không giới hạn (ví dụ query Users) → deny luôn
        throw new Error("Permission denied user!");
      }
        // Không thỏa điều kiện
      throw new Error("Permission denied!");
    };
  };
};
