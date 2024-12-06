import { Request, Response } from 'express';
import prisma from '../../../lib/prisma';
import { APIResponse } from '../../../types';
import { LogService } from '../../../services/logService';

export const handleClerkWebhook = async (req: Request, res: Response) => {
  try {
    const evt = req.webhookEvent;
    const eventType = evt.type;
    const { id } = evt.data;

    await LogService.log('webhook', 'info', 'Webhook event received', {
      type: eventType,
      userId: id,
      data: evt.data
    });

    switch (eventType) {
      case 'user.created': {
        const { email_addresses, primary_email_address_id, first_name, last_name } = evt.data;
        
        console.log('Creating user with data:', {
          clerkId: id,
          email_addresses,
          primary_email_address_id,
          first_name,
          last_name
        });

        const primaryEmail = email_addresses.find(
          (email: any) => email.id === primary_email_address_id
        );

        if (!primaryEmail) {
          console.error('No primary email found in:', email_addresses);
          throw new Error('No primary email found');
        }

        const user = await prisma.user.create({
          data: {
            clerkId: id,
            email: primaryEmail.email_address,
            name: first_name ? `${first_name} ${last_name || ''}`.trim() : null,
            role: 'user',
          },
        });

        console.log('✅ User created successfully:', user);
        break;
      }

      case 'user.updated': {
        console.log('🔄 Processing user.updated webhook');
        const { 
          email_addresses, 
          primary_email_address_id, 
          first_name, 
          last_name,
          public_metadata 
        } = evt.data;

        console.log('📨 Raw update data:', evt.data);
        console.log('🔑 User ID:', id);
        console.log('📝 Public metadata:', public_metadata);

        const primaryEmail = email_addresses.find(
          (email: any) => email.id === primary_email_address_id
        );

        const updateData = {
          email: primaryEmail?.email_address,
          name: first_name ? `${first_name} ${last_name || ''}`.trim() : null,
          ...(public_metadata?.role && { role: public_metadata.role as string }),
        };

        console.log('📦 Update data to be sent to Prisma:', updateData);

        try {
          const existingUser = await prisma.user.findUnique({
            where: { clerkId: id }
          });
          console.log('🔍 Existing user:', existingUser);

          const updatedUser = await prisma.user.update({
            where: { clerkId: id },
            data: updateData,
          });

          console.log('✅ User updated successfully:', updatedUser);
          await LogService.log('webhook', 'info', 'User updated successfully', updatedUser);
        } catch (error) {
          console.error('❌ Update failed:', error);
          throw error; // Re-throw to be caught by the main try-catch
        }
        break;
      }

      case 'user.deleted': {
        console.log('🗑️ Processing user.deleted webhook');
        console.log('🔑 User ID to delete:', id);

        try {
          // First check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { clerkId: id }
          });
          console.log('🔍 User to delete:', existingUser);

          if (!existingUser) {
            console.log('⚠️ User not found in database');
            break;
          }

          const deletedUser = await prisma.user.delete({
            where: { clerkId: id },
          });

          console.log('✅ User deleted successfully:', deletedUser);
          await LogService.log('webhook', 'info', 'User deleted successfully', { clerkId: id });
        } catch (error) {
          console.error('❌ Delete failed:', error);
          throw error; // Re-throw to be caught by the main try-catch
        }
        break;
      }

      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    const response: APIResponse = {
      success: true,
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  } catch (error) {
    await LogService.log('webhook', 'error', 'Webhook processing failed', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack
      } : error
    });
    
    const response: APIResponse = {
      success: false,
      error: 'Webhook processing failed',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(response);
  }
}; 